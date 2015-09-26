var requiredKeys  = [];
var indexedFields = [];

Meteor.methods({
	addEstimate: function(doc){
		//AppHelpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			AppHelpers.addCreatedValues(doc);
			return Clients.insert(doc);
		}
	},
	updateEstimate: function(doc){
		//AppHelpers.stringSearch(doc, indexedFields);
		var id = doc._id;
		delete doc._id;
		if (Meteor.isServer) {
			AppHelpers.addUpdatedValues(doc);
			return Clients.update(id, {$set: doc});
		}
	}
});