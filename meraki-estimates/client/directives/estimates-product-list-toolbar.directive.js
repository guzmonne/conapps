angular.module('conapps').directive('estimatesProductListToolbar', estimatesProductListToolbar);

function estimatesProductListToolbar(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-product-list-toolbar.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			stringSearch: '=',
		},
	}
}

controller.$inject = ['showModal', 'merakiProductService'];

function controller(showModalService, merakiProduct){
	var vm = this;

	vm.updateFilters = updateFilters;
	vm.showModal     = showModal;

	////////////
	
	function showModal(){
		merakiProduct.setDefault();
		showModalService('#productListModalForm');
	}

	function updateFilters(){
		vm.stringSearch = vm._stringSearch;
	}
}