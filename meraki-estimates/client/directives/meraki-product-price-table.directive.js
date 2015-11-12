angular.module('conapps').directive('merakiProductPriceTable', merakiProductPriceTable);

function merakiProductPriceTable(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/meraki-product-price-table.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			product: '='
		},
	}
}

function controller(){
	
}