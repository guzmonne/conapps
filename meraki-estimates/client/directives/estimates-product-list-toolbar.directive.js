angular.module('conapps').directive('estimatesProductListToolbar', function(){
	return {
		restirct    : 'E',
		replace     : true,
		templateUrl : 'meraki-estimates/client/views/estimates-product-list-toolbar.template.ng.html',
		scope       : {
			options: '='
		},
		controller: ['updateFiltersService', 'showModal', function(updateFiltersService, showModal){
			this.stringSearch = '',
			this.updateFilters = updateFiltersService.bind(this);
			this.openModal = function(){
				showModal('#productListModalForm');
			};
		}],
		controllerAs     : 'productListToolbar',
		bindToController : true,
	};
});