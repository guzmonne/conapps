Meteor.publish('switches', function(filter){
	filter || (filter = {});
	console.log(filter);
	return Switches.find(filter);
});