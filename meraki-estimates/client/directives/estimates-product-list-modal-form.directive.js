angular.module('conapps').directive('estimatesProductListModalForm', function (){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/estimates-product-list-modal-form.template.ng.html',
		scope: {
			product: '=',
		},
		controller: [function(){}],
		controllerAs: 'productListModalForm',
		bindToController: true,
	};
});