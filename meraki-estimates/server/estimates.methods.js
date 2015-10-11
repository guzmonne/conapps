Meteor.methods({
	addEstimate: function(doc){
		App.helpers.verifyDoc(doc, requiredKeys);
		App.helpers.filterUnacceptedKeys(doc, acceptedKeys);
		App.helpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			App.helpers.addCreatedValues(doc);
			return Clients.insert(doc);
		}
	},
	updateEstimate: function(doc){
		var id = doc._id;
		App.helpers.verifyDoc(doc, requiredKeys);
		App.helpers.filterUnacceptedKeys(doc, acceptedKeys);
		App.helpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			App.helpers.addUpdatedValues(doc);
			return Clients.update(id, {$set: doc});
		}
	},
	getEstimate: function(estimateId){
		if (Meteor.isServer){
			check(estimateId, String);
			if (!Meteor.user())
				throw new Meteor.Error('El usuario no esta registrado');
			var estimate = Estimates.findOne(estimateId);
			if (!estimate || !estimate.createdBy)
				throw new Meteor.Error('El estimate hallado no es valido');
			if (estimate.createdBy !== Meteor.userId)
				throw new Meteor.Error('No tiene permiso para acceder a este estimate');
			return estimate;
		}
	},
});

var requiredKeys  = ['name'];
var indexedFields = ['name', 'description'];
var acceptedKeys  = ['name', 'description', 'products'];