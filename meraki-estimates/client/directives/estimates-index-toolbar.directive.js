angular.module('conapps').directive('estimatesIndexToolbar', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/estimates-index-toolbar.template.ng.html',
		scope: {
			options: '=',
		},
		controller: ['updateFiltersService', function(updateFiltersService){
			this.stringSearch = '';
			this.updateFilters = updateFiltersService.bind(this);
		}],
		controllerAs: 'indexToolbar',
		bindToController: true,
	};
});