Meteor.methods({
	'reset': function(){
		Estimates.remove({});
		MerakiProducts.remove({});
	},
	'estimate/create': function(estimate){
		Estimates.insert(estimate);
	}
});