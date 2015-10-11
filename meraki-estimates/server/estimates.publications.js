Meteor.publish('estimates', function(terms){
	var parameters = Estimates.constructQuery(terms);
	if (parameters)
		return Estimates.find(parameters.filters, parameters.options);
	else
		throw new Meteor.Error('wrong-parameters');
});