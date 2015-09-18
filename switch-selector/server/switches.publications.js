Meteor.publish('switches', function(filter){
	filter || (filter = {});
	return Switches.find(filter);
});