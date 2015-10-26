angular.module('conapps').directive('estimatesEditProducts', estimatesEditProducts);

function estimatesEditProducts(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-edit-products.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			products: '=',
			licenses: '=',
		},
	}
}

controller.$inject = ['estimateEditService'];

function controller(es){
	var vm = this;

	vm.estimate = es.estimate;
	vm.displayView = 'list';
	vm.display = 'products';
	vm.updateProductQty = _.debounce(es.updateProductQty, 500);
}