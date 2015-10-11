angular.module('conapps').directive('estimatesProductListToolbar', function(){
	return {
		restirct    : 'E',
		replace     : true,
		templateUrl : 'meraki-estimates/client/views/estimates-product-list-toolbar.template.ng.html',
		scope       : {
			options: '='
		},
		controller: ['updateFiltersService', 'showModal', 'merakiProductService', function(updateFiltersService, showModal, merakiProductService){
			this.stringSearch = '',
			this.updateFilters = updateFiltersService.bind(this);
			this.openModal = function(){
				merakiProductService.setDefault();
				showModal('#productListModalForm');
			};
		}],
		controllerAs     : 'productListToolbar',
		bindToController : true,
	};
});