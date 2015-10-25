Meteor.methods({

	createEstimate: function(doc){
		App.helpers.verifyDoc(doc, requiredKeys);
		App.helpers.filterUnacceptedKeys(doc, acceptedKeys);
		App.helpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			App.helpers.addCreatedValues(doc);
			return Estimates.insert(doc);
		}
	},

	updateEstimate: function(doc){
		var id = doc._id;
		App.helpers.verifyDoc(doc, requiredKeys);
		App.helpers.filterUnacceptedKeys(doc, acceptedKeys);
		App.helpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			App.helpers.addUpdatedValues(doc);
			return Estimates.update(id, {$set: doc});
		}
	},

	getEstimate: function(estimateId){
		if (Meteor.isServer){
			check(estimateId, String);
			if (!Meteor.user())
				throw new Meteor.Error('user-is-not-logged', 'El usuario no esta registrado');
			var estimate = Estimates.findOne(estimateId);
			if (!estimate || !estimate.createdById)
				throw new Meteor.Error('invalid-estimate', 'El estimate hallado no es valido');
			if (estimate.createdById !== Meteor.userId())
				throw new Meteor.Error('not-estimate-owner', 'No tiene permiso para acceder a este estimate');
			return estimate;
		}
	},

	addProductsToEstimate: function(estimateId, pIDsQty){
		if (Meteor.isServer){
			
			check(estimateId, String);
			check(pIDsQty, Array);

			var products = [];


			_.each(pIDsQty, function(p, i){
				var qty = pIDsQty[i].quantity;

				product = MerakiProducts.findOne(p._id, {fields:
					{
						"_id"         : 1,
						"family"      : 1,
						"line"        : 1,
						"model"       : 1,
						"description" : 1,
						"price"       : 1,
						"image"       : 1,
						"datasheet"   : 1,
					}
				});
				console.log(estimateId, pIDsQty, qty, product);

				product.quantity = qty;

				products.push(product);
			});

			return Estimates.update(estimateId, { $set: { products: products } });
		
		}
	},

});

var requiredKeys  = ['name'];
var indexedFields = ['name', 'description'];
var acceptedKeys  = ['name', 'description', 'products'];