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

			if (App.auth.isAdmin()){
				var user = Meteor.users.findOne(userId);
				return Meteor.users.update(userId, {
					$set: { 
						deleted: true,
						username: user.username + '[Deleted]' 
					}
				});
			}	
			else
				throw new Meteor.Error('Usuario no administrador', 'no-autorizado');
		}
	},

	'users-admin:update-roles': function(userId, roles){
		if (Meteor.isServer){

			check(userId, String);
			check(roles, Array);

			roles.forEach(role => check(role, String));

			if (!App.auth.isAdmin())
				throw new Meteor.Error('Acción no autorizada!', 400);

			Meteor.users.update(userId, {$set: { 'profile.roles': roles }});
		}
	}
})