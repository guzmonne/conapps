angular.module('conapps').directive('estimatesProductListToolbar', function(){
	return {
		restirct    : 'E',
		replace     : true,
		templateUrl : 'meraki-estimates/client/views/estimates-product-list-toolbar.template.ng.html',
		scope       : {
			options: '='
		},
		controller: ['updateFiltersService', function(updateFiltersService){
			this.stringSearch = '',
			this.updateFilters = updateFiltersService.bind(this);
		}],
		controllerAs     : 'productListToolbar',
		bindToController : true,
	};
});