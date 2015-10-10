Estimates = new Mongo.Collection('estimates');

Estimates.constructQuery = function(terms){
	if (!terms || !terms.type || !queries[terms.type]) return;
	return queries[terms.type].call(terms);
}

var queries = {
	index: function(){
		var parameters = {filters: {}, options: {}};
		//parameters.filter.owner = Meteor.user()._id;
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