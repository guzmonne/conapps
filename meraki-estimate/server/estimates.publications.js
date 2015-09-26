Meteor.publish('estimates', function(filter, options){
	filter  || (filter = {});
	options || (options = {});
	filter = _.extend(filter, {userId: Meteor.userId});
	return Estimates.find(filter, options);
});