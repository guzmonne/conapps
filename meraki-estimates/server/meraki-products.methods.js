Meteor.methods({
	createMerakiProduct: createMerakiProduct,
	updateMerakiProduct: updateMerakiProduct,
	deleteMerakiProduct: deleteMerakiProduct,
});

function createMerakiProduct (doc){
	if (!doc) throw new Meteor.Error('missing-doc');
	doc = _.compactObject(doc);
	App.helpers.verifyDoc(doc, requiredKeys);
	App.helpers.stringSearch(doc, indexedFields);
	parseDocValues(doc);
	if (Meteor.isServer){
		App.helpers.addCreatedValues(doc);
		return MerakiProducts.insert(doc);
	}
}

function updateMerakiProduct (doc){
	if (!doc) throw new Meteor.Error('missing-doc');
	App.helpers.verifyDoc(doc, requiredKeys);
	App.helpers.stringSearch(doc, indexedFields);
	parseDocValues(doc);
	if (Meteor.isServer){
		var id = doc._id;
		if (!id) {
			throw new Meteor.Error('missing-id');
			delete doc._id;
		}
		App.helpers.addUpdatedValues(doc);
		return MerakiProducts.update(id, {$set: doc});
	}
}

function deleteMerakiProduct (productId){
	if (!productId)
		throw new Meteor.Error('productId-is-undefined');
	return MerakiProducts.update(productId, { $set: { deleted: true } });
}

function parseDocValues(doc){
	doc.model = doc.model.toUpperCase();
}

var requiredKeys = [
	'line',
	'family',
	'model',
	'description',
	'price',
];

var indexedFields = requiredKeys;

