angular.module('conapps').directive('estimatesEditToolbar', estimatesEditToolbar);

function estimatesEditToolbar(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-edit-toolbar.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			products: '='
		},
	}
}

controller.$inject = ['showModal', 'estimateEditService'];

function controller(sm, es){
	var vm = this;

	vm.showModal = showModal;
	vm.estimate = es.estimate;
	vm.toggleDeal = es.toggleDeal;
	vm.toggleCustomDiscount = es.toggleCustomDiscount;
	vm.updateYears = es.updateYears;

	///////////
	
	function showModal(){
		sm('#estimatesAddProductsModal');
	}
}
