App.auth = {
	hasRole: hasRole,
	isAdmin: isAdmin,
	isUser : isUser,
	isOwner: isOwner,
}

function hasRole (role){
	var user, roles;
	
	check(role, String);
	
	user = Meteor.user();
	
	if (!user || !user.profile) {
		if (Meteor.isServer){
			throw new Meteor.Error('user-not-logged-in');
		}
		return;
	}
	
	roles = user.profile.roles;
	
	if (!roles || !_.isArray(roles))
		throw new Meteor.Error('roles-undefined-or-not-an-array');
	
	return roles.indexOf(role) > -1
}

function isAdmin(){
	return hasRole('admin');
}

function isUser(userId){
	return userId === Meteor.userId();
}

function isOwner(userId, doc){
	return userId === doc.createdById;
}