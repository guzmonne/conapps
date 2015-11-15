angular.module('conapps').service('updateFiltersService', [function(){
	return function(){
		this.options      || (this.options = {});
		this.stringSearch || (this.stringSearch = '');
		this.options.stringSearch = this.stringSearch;
	}
}]);