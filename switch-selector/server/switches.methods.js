var requiredKeys = ['family', 'model', 'brand', 'ports', 'portSpeed'];

Meteor.methods({
	addSwitch: function(doc){
		App.helpers.verifyDoc(doc, requiredKeys);
		doc.createdAt = moment().utc().format();;
		doc.createdById = Meteor.userId();
		doc.createdByUsername = Meteor.user().username;
		Switches.insert(doc, function(err, result){
			if (err) throw new Meteor.Error(err);
			return result;
		});
	},
	updateSwitch: function(doc){
		App.helpers.verifyDoc(doc, requiredKeys);
		doc.updatedAt = moment().utc().format();;
		doc.updatedById = Meteor.userId();
		doc.updatedByUsername = Meteor.user().username;
		var id = doc._id;
		delete doc._id;
		Switches.update(id, { $set: doc }, function(err, result){
			if (err) throw new Meteor.Error(err);
			return result;
		});
	}
});