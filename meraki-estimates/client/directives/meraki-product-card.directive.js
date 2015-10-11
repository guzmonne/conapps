angular.module('conapps').directive('merakiProductCard', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/meraki-product-card.template.ng.html',
		scope: {
			product: '=',
		},
		controller: [function(){}],
		controllerAs: 'merakiProductCard',
		bindToController: true,
	}
});