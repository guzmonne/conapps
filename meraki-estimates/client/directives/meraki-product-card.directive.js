angular.module('conapps').directive('merakiProductCard', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/meraki-product-card.template.ng.html',
		scope: {
			product: '=',
		},
		controller: ['merakiProductService', 'showModal', function(merakiProductService, showModal){
			this.editProduct = function(){
				merakiProductService.setProduct(this.product);
				showModal('#productListModalForm');
			}
		}],
		controllerAs: 'merakiProductCard',
		bindToController: true,
	}
});