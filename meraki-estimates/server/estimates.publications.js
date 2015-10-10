Meteor.publish('estimates', function(terms){
	var parameters = Estimates.constructQuery(terms);
	console.log(parameters);
	if (parameters)
		return Estimates.find(parameters.filters, parameters.options);
	else
		throw new Meteor.Error('wrong-parameters');
});