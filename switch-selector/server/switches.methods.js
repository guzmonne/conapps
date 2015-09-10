Meteor.methods({
	addSwitch: function(doc){
		doc.createdAt = new Date();
		Switches.insert(doc, function(err, result){
			if (err) throw new Meteor.Error(err);
			return result;
		});
	},
});