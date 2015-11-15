Meteor.methods({

	'estimate:create': function(doc){
		App.helpers.verifyDoc(doc, requiredKeys);
		App.helpers.filterUnacceptedKeys(doc, acceptedKeys);
		App.helpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			doc.discount   = 0.43;
			doc.years      = 3;
			doc.hwMargin   = 0.25;
			doc.swMargin   = 0.25;
			doc.intCost    = 0.25;
			doc.supMargin  = 0.25;
			doc.deal       = true;
			doc.serviceLvl = '8x5xNBD';
			App.helpers.addCreatedValues(doc);
			return Estimates.insert(doc);
		}
	},

	'estimate:update': function(doc){
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
		check(estimateId, String);
		
		if (!Meteor.user())
			throw new Meteor.Error('user-is-not-logged', 'El usuario no esta registrado');
		var estimate = Estimates.findOne(estimateId);
		
		if (!estimate || !estimate.createdById)
			throw new Meteor.Error('invalid-estimate', 'El estimate hallado no es valido');
		
		if (estimate.createdById !== Meteor.userId())
			throw new Meteor.Error('not-estimate-owner', 'No tiene permiso para acceder a este estimate');
		
		return estimate;
	},

	'estimate:get:attrs': function(estimateId){
		check(estimateId, String);

		return Estimates.findOne(estimateId, {fields: 
			{
				'_id'            : -1,
				'deal'           : 1,
				'discount'       : 1,
				'customDiscount' : 1
			}
		});
	},

	'estimate:add:products': function(estimateId, attrs, years){
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
		
		App.helpers.saveUpdatedData(Estimates, estimateId);

		return result;
	},

	'estimate:toggle:deal': function(estimateId){
		check(estimateId, String);
		
		var estimate, deal, discount;

		estimate = Estimates.findOne(estimateId);
		deal     = !estimate.deal;
		discount = (deal) ? 0.43 : 0.35;
		
		return [
			Estimates.update(estimateId, { $set: { deal: deal, discount: discount } }),
			App.helpers.saveUpdatedData(Estimates, estimateId)
		];
	},

	'estimate:toggle:customDiscount': function(estimateId){
		check(estimateId, String);
		
		var e;

		e = Estimates.findOne(estimateId, {fields: {customDiscount: 1}});

		return [
			Estimates.update(estimateId, { $set: { customDiscount:  !e.customDiscount} }),
			App.helpers.saveUpdatedData(Estimates, estimateId)
		];
	},

	'estimate:toggle:serviceLvl': function(estimateId){
		check(estimateId, String);

		var estimate, serviceLvl; 

		estimate = Estimates.findOne(estimateId, {serviceLvl: 1});

		if (!estimate.serviceLvl || estimate.serviceLvl === '24x7x1x6')
			serviceLvl = '8x5xNBD';
		else
			serviceLvl = '24x7x1x6';

		return [
			Estimates.update(estimateId, { $set: { serviceLvl: serviceLvl } }),
			App.helpers.saveUpdatedData(Estimates, estimateId)
		];
	},

	'estimate:update:years': function(estimateId, years){
		years = parseInt(years);
		
		check(estimateId, String);
		check(years, Number);

		var licenses, estimate = Estimates.findOne(estimateId);

		if (!estimate) throw new Meteor.Error('undefined estimate');

		licenses = getLicensesForProducts(estimate.products, years);

		return [
			Estimates.update(estimateId, { $set: { years: years, licenses: licenses } }),
			App.helpers.saveUpdatedData(Estimates, estimateId)
		]
	},

	'estimate:modify:product:quantity': function(attrs){
		App.helpers.docHasRequiredKeys(attrs, ['_id', 'id', 'qty']);

		var result     = [];
		var estimateId = attrs._id;
		
		result.push(
			Estimates.update({
				_id: estimateId,
				'products.id': attrs.id
			}, {
				$set: {
					'products.$.quantity': attrs.qty
				}
			})
		);

		result.push(
			Estimates.update({
				_id: estimateId,
				'licenses.productId': attrs.id
			}, {
				$set: {
					'licenses.$.quantity': attrs.qty
				}
			})
		);

		result.push(
			App.helpers.saveUpdatedData(Estimates, estimateId)
		);

		return result;
	},

	'estimate:remove:product': function(estimateId, product){
		if (Meteor.isServer){
			var estimate, products, licenses;

			check(estimateId, String);
			check(product.id, String);

			estimate = Estimates.findOne(estimateId);

			if (Meteor.userId() !== estimate.createdById)
				throw new Meteor.Error('Not Estimate owner', 'not-authorized');

			products = _.filter(estimate.products, p => p.id !== product.id)

			licenses = getLicensesForProducts(products, estimate.years);

			return [
				Estimates.update(estimateId, { $set: { products: products, licenses: licenses } }),
				App.helpers.saveUpdatedData(Estimates, estimateId)
			];
		}
	},

	'estimate:update:modifiers': function(estimateId, attrs){
		var modifiers;

		modifiers = ['hwMargin', 'swMargin', 'intCost', 'supMargin'];

		check(estimateId, String);
		
		App.helpers.filterUnacceptedKeys(attrs, modifiers);
		App.helpers.docHasRequiredKeys(attrs, modifiers);

		return [
			Estimates.update(estimateId, { $set: attrs }),
			App.helpers.saveUpdatedData(Estimates, estimateId)
		];
	},

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
		
		if (l){
			l.productId = p.id;
			l.quantity  = p.quantity;
			licenses.push(l);
		}
	});

	return licenses;
}