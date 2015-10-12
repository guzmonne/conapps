angular.module('conapps').directive('estimatesEditProducts', estimatesEditProducts);

function estimatesEditProducts(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-edit-products.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {
			products: '='
		},
	}
}

controller.$inject = [];

function controller(){
	var vm = this;
}

function link (scope, element, attr){}