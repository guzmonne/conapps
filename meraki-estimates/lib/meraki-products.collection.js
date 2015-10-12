MerakiProducts = new Mongo.Collection('merakiProducts');

App.addQueryConstructorFunctionality(MerakiProducts, {
	'index-by-line': indexByLine,
});

function indexByLine(collection){
	var parameters = collection.callQuery('index', this);
	if (!this.line) return parameters;
	if (!_.isString(this.line))
		throw new Meteor.Error('product-line-is-missing');
	return { 
		filters: _.extend(parameters.filters, { line: this.line }),
		options: parameters.options
	};
}