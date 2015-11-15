Meteor.methods({

	'users-admin:create': function(doc){
		doc = _.pick(doc, 'username', 'email', 'password', 'profile');

		if (doc.profile)
			doc.profile = _.pick(doc.profile, 'name', 'roles');

		return Accounts.createUser(doc);
	}

})