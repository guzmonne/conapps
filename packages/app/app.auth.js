App.auth = {
	hasRole: hasRole,
	isAdmin: isAdmin,
	isUser : isUser,
	isOwner: isOwner,
}

function hasRole (role){
	check(role, String);
	var user, roles;
	user = Meteor.user();
	if (!user || !user.profile)
		throw new Meteor.Error('user-not-logged-in');
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