Meteor.publish('clients', function(filter, options){
	filter  || (filter = {});
	options || (options = {});
	return Clients.find(filter, options);
});