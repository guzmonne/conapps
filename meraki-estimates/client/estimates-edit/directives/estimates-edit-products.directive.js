angular.module('conapps').directive('estimatesEditProducts', estimatesEditProducts);

function estimatesEditProducts(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/estimates-edit/views/estimates-edit-products.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			products: '=',
			licenses: '=',
		},
	}
}

controller.$inject = ['estimateEditService', 'estimateModifiers'];

function controller(es, em){
	var vm = this;

	vm.estimate         = es.estimate;
	vm.displayView      = 'list';
	vm.updateProductQty = _.debounce(es.updateProductQty, 500);
	vm.removeProduct    = es.removeProduct;

	vm.calculateCost   = em.calculateCost;
	vm.supCostPerMonth = em.supCostPerMonth;
	vm.admCostPerMonth = em.admCostPerMonth;
	vm.swCostPerMonth  = em.swCostPerMonth;
	
	vm.hwCost  = em.hwCost;
	vm.hwTotal = em.hwTotal;
	vm.swCost  = em.swCost;
	vm.swTotal = em.swTotal;
}