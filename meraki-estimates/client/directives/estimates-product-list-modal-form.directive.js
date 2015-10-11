angular.module('conapps').directive('estimatesProductListModalForm', function (){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/estimates-product-list-modal-form.template.ng.html',
		scope: {
			product: '=',
		},
		controller: ['callSaveMethod', function(callSaveMethod){
			this.productIsNew = function(){ return !(this.product && this.product._id) }
			this.saveProduct  = function(){
				callSaveMethod(this.product, {
					createMethod  : 'createMerakiProduct',
					updateMethod  : 'updateMerakiProduct',
					createMessage : 'Producto creado.',
					updateMessage : 'Producto actualizado.'
				})
				.then(function(result){
					console.log(result);
					if (!this.product._id)
						this.product = { attributes: {} };
				}.bind(this))
			}
		}],
		controllerAs: 'vm',
		bindToController: true,
	};
});
