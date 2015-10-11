var queries = {
	index: function(){
		var parameters = {filters: {}, options: {}};
		if (this.sort) {
			parameters.options.sort = {};
			parameters.options.sort[this.sort] = (this.reverse) ? -1 : 1;	
		}
		if (this.stringSearch && _.isString(this.stringSearch))
			parameters.filters.stringSearch = {
				$regex: this.stringSearch.toLowerCase()
			};
		return parameters;
	}
};

function constructQuery(terms){
	if (!terms || !terms.type || !this._queries[terms.type])
		throw new Meteor.Error('wrong-arguments|missing-type');
	return this._queries[terms.type].call(terms);
}

App.addQueryConstructorFunctionality = function(Collection, customQueries){
	customQueries || (customQueries = {});
	if (!_.isObject(Collection))
		throw new Meteor.Error('collection-is-not-an-object');
	Collection._queries = _.extend(_.clone(queries), customQueries);
	Collection.constructQuery = constructQuery.bind(Collection);
}