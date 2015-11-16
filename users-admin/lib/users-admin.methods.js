Meteor.methods({

	'users-admin:create': function(doc){
		if (Meteor.isServer){
			doc = _.pick(doc, 'username', 'email', 'password', 'profile');

			if (doc.profile)
				doc.profile = _.pick(doc.profile, 'name', 'roles');

			return Accounts.createUser(doc);
		}
	},

	'users-admin:delete': function(userId){
		if (Meteor.isServer) {
			check(userId, String)

			var user = Meteor.user();

			if ( user 
				&& user.profile 
				&& _.isArray(user.profile.roles) 
				&& user.profile.roles.indexOf('admin') > -1 )		
				return Meteor.users.update(userId, {$set: { deleted: true }} );
			else
				throw new Meteor.Error('Usuario no administrador', 'no-autorizado');
		}
	}

})