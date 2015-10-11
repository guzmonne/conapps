angular.module('conapps').directive('estimatesProductListModalForm', ['merakiProductService', function (merakiProductService){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/estimates-product-list-modal-form.template.ng.html',
		scope: {},
		controller: ['callSaveMethod', function(callSaveMethod){
			this.product = merakiProductService.product;
			this.productIsNew = function(){ return !(this.product && this.product._id) }
			this.saveProduct  = function(){
				callSaveMethod(this.product, {
					createMethod  : 'createMerakiProduct',
					updateMethod  : 'updateMerakiProduct',
					createMessage : 'Producto creado.',
					updateMessage : 'Producto actualizado.'
				})
				.then(function(result){
					if (!this.product._id)
						this.product = merakiProductService.setDefault();
				}.bind(this))
			}
		}],
		controllerAs: 'vm',
		bindToController: true,
	};
}]);
