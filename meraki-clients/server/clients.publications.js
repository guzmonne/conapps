Meteor.publish('clients', function(filter, options){
	filter  || (filter = {});
	options || (options = {});
	console.log(options);
	return Clients.find(filter, options);
});