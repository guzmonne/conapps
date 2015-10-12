angular.module('conapps').directive('merakiProductRow', merakiProductRow);

function merakiProductRow(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/meraki-product-row.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {
			product: '='
		},
	}
}

controller.$inject = [];

function controller(){
	
}

function link (scope, element, attr){}