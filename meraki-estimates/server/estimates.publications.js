Meteor.publish('estimates', function(terms){
	terms.userId = this.userId;
	var parameters = Estimates.constructQuery(terms);
	if (parameters){
		parameters.filters.createdById = this.userId;
		return Estimates.find(parameters.filters, parameters.options);
	}
	else
		throw new Meteor.Error('wrong-parameters');
});