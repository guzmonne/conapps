Meteor.methods({
	addSwitch: function(doc){
		doc.createdAt = new Date();
		Switches.insert(doc, function(err, result){
			if (err) throw new Meteor.Error(err);
			return result;
		});
	},
	updateSwitch: function(doc){
		doc.updatedAt = new Date();
		var id = doc._id;
		delete doc._id;
		Switches.update(id, { $set: doc }, function(err, result){
			if (err) throw new Meteor.Error(err);
			return result;
		});
	}
});