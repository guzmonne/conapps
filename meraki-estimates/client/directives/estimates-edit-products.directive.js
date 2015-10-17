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
			products: '='
		},
	}
}

controller.$inject = [];

function controller(){
	var vm = this;
}