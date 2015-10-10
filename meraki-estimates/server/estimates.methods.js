var requiredKeys  = ['name'];
var indexedFields = ['name', 'description'];

Meteor.methods({
	addEstimate: function(doc){
		AppHelpers.verifyDoc(doc, requiredKeys);
		AppHelpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			AppHelpers.addCreatedValues(doc);
			return Clients.insert(doc);
		}
	},
	updateEstimate: function(doc){
		AppHelpers.verifyDoc(doc, requiredKeys);
		AppHelpers.stringSearch(doc, indexedFields);
		var id = doc._id;
		delete doc._id;
		if (Meteor.isServer) {
			AppHelpers.addUpdatedValues(doc);
			return Clients.update(id, {$set: doc});
		}
	}
});