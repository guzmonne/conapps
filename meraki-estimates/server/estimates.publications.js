Meteor.publish('estimates', function(terms){
	terms.userId = this.userId;

	var parameters = Estimates.constructQuery(terms);
	
	if (parameters){
		parameters.filters.createdById = this.userId;
		return Estimates.find(parameters.filters, parameters.options);
	} else {
		throw new Meteor.Error('wrong-parameters');
	}
});

Meteor.publish('estimate', function(id){
	check(id, String);

	var estimate = Estimates.findOne(id);
	if (estimate.createdById !== this.userId )
		throw new Meteor.Error('El usuario no es dueño de este estimate', '¡No Autorizado!');

	return Estimates.find({_id: id});
});