Meteor.publish('merakiProducts', function(terms){
	var parameters = MerakiProducts.constructQuery(terms);
	if (parameters)
		return MerakiProducts.find(parameters.filters, parameters.options);
	else
		throw new Meteor.Error('wrong-parameters');
});