Meteor.publish('users', () => {

	return Meteor.users.find({ deleted: {$exists: false} }, {
		fields: {
			'_id'           : 1,
			'emails'        : 1,
			'username'      : 1,
			'profile.name'  : 1,
			'profile.roles' : 1
		}
	});

});