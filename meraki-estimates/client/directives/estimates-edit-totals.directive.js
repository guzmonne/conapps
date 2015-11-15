angular.module('conapps').directive('estimatesEditTotals', estimatesEditTotals);

function estimatesEditTotals(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-edit-totals.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			modifiers: '=',
			products : '='
		},
	}
}

controller.$inject = ['estimateModifiers'];

function controller(em){
	var vm = this;

	vm.hwCost = em.hwCost;
	vm.traditionalMonthlyPayment = em.traditionalMonthlyPayment;
	vm.administeredMonthlyPayment = em.administeredMonthlyPayment;
	vm.unifiedMonthlyPayment = em.unifiedMonthlyPayment;
	vm.weights = em.weights;
	vm.params = em.params;
}