angular.module('conapps').directive('estimatesAddProducts', estimatesAddProducts);

function estimatesAddProducts(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-add-products.template.ng.html',
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
	
}