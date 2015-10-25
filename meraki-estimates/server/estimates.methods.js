Meteor.methods({

	createEstimate: function(doc){
		App.helpers.verifyDoc(doc, requiredKeys);
		App.helpers.filterUnacceptedKeys(doc, acceptedKeys);
		App.helpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			doc.discount  = 0.35;
			doc.years     = 3;
			doc.hwMargin  = 0.25;
			doc.swMargin  = 0.25;
			doc.intCost   = 0.25;
			doc.supMargin = 0.25;
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

	'estimate:get': function(estimateId){
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

	'estimate:get:attrs': function(estimateId){
		if (Meteor.isServer){
			check(estimateId, String);

			return Estimates.findOne(estimateId, {fields: 
				{
					'_id'            : -1,
					'deal'           : 1,
					'discount'       : 1,
					'customDiscount' : 1
				}
			});
		}
	},

	'estimate:add:products': function(estimateId, attrs, years){
		if (Meteor.isServer){
			
			check(estimateId, String);
			check(attrs, Array);

			var result = [], licenses = [], products = [];

			_.each(attrs, function(p, i){
				var qty = attrs[i].quantity;

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

				product.quantity = qty;
				product.id = new Mongo.ObjectID()._str;

				products.push(product);
			});

			licenses = getLicensesForProducts(products, years);

			result.push( Estimates.update(estimateId, { $addToSet: { products: { $each: products } } }) );
			result.push( Estimates.update(estimateId, { $addToSet: { licenses: { $each: licenses } } }) );
		
			return result;
		}
	},

	toggleDeal: function(id){
		check(id, String);

		if (Meteor.isServer){
			var estimate, deal, discount;
			estimate = Estimates.findOne(id);
			deal     = !estimate.deal;
			discount = (deal) ? 0.43 : 0.35;
			return Estimates.update(id, { $set: { deal: deal, discount: discount } });
		}
	},

	toggleCustomDiscount: function(id){
		check(id, String);

		if (Meteor.isServer){
			var e;

			e = Estimates.findOne(id, {fields: {customDiscount: 1}});

			return Estimates.update(id, { $set: { customDiscount:  !e.customDiscount} });
		}
	},

	'estimate:update:years': function(id, years){
		check(id, String);

		years = parseInt(years);

		check(years, Number);

		return Estimates.update(id, { $set: { years: years } });
	}

});

var requiredKeys  = ['name'];
var indexedFields = ['name', 'description'];
var acceptedKeys  = ['name', 'description', 'products'];

function getLicensesForProducts(products, years){
	var licenses = [];

	check(products, Array);

	_.each(products, p => {
		var l, licenseFor = (p.family === 'MR') ? 'MR' : p.model.replace('-HW', '');
			
		if (p.family === 'MR')
			licenseFor = 'MR'
		else if (p.family === 'Z1')
			licenseFor = 'Z1-ENT'
		else
			licenseFor = p.model.replace('-HW', '')

		l = MerakiProducts.findOne({licenseFor: licenseFor, years: years});
		
		console.log(l);

		if (l)
			licenses.push(l);
	});

	return licenses;
}