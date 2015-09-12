var requiredKeys = ['family', 'model', 'brand', 'ports', 'portSpeed'];

function verifyDoc(doc){
	if (! Meteor.userId())
    throw new Meteor.Error("not-authorized");
  _.forEach(requiredKeys, function(key){
  	if (!_.has(doc, key))
  		throw new Meteor.Error("missing-arguments");
  });
}

Meteor.methods({
	addSwitch: function(doc){
		verifyDoc(doc);
		doc.createdAt = new Date();
		doc.createdById = Meteor.userId();
		doc.createdByUsername = Meteor.user().username;
		Switches.insert(doc, function(err, result){
			if (err) throw new Meteor.Error(err);
			return result;
		});
	},
	updateSwitch: function(doc){
		verifyDoc(doc);
		doc.updatedAt = new Date();
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