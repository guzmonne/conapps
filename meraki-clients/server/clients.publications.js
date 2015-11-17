Meteor.publish('clients', function(filter, options){
	filter  || (filter = {});
	options || (options = {});

	filter = _.extend(filter, { deleted: {$exists: false} });

	return Clients.find(filter, options);
});