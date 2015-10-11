var requiredKeys  = ['name'];
var indexedFields = ['name', 'description'];

Meteor.methods({
	addEstimate: function(doc){
		App.helpers.verifyDoc(doc, requiredKeys);
		App.helpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			App.helpers.addCreatedValues(doc);
			return Clients.insert(doc);
		}
	},
	updateEstimate: function(doc){
		App.helpers.verifyDoc(doc, requiredKeys);
		App.helpers.stringSearch(doc, indexedFields);
		var id = doc._id;
		delete doc._id;
		if (Meteor.isServer) {
			App.helpers.addUpdatedValues(doc);
			return Clients.update(id, {$set: doc});
		}
	}
});