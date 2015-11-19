angular.module('conapps').directive('merakiProductCard', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/estimates-product-list/views/meraki-product-card.template.ng.html',
		scope: {
			product: '=',
		},
		controller: ['merakiProductService', 'showModal', function(merakiProductService, showModal){
			var deleteBootboxDialog = {
				message: '¿Esta seguro que desea eliminar este producto?',
				title: 'Eliminar Producto',
				buttons: {
					confirm: {
						label: 'Aceptar',
						className: 'btn-primary',
						callback: function() {
							merakiProductService.deleteProduct(this.product._id)
							.then(function(){ toastr.success('Producto eliminado', 'Exito!'); })
							.catch(function(){ toastr.error('Ha ocurrido un error inesperado', 'Error!') });
						}.bind(this)
					},
					cancel: {
						label: 'Cancelar',
						className: 'btn-default',
					}
				}
			};

			this.editProduct = function(){
				merakiProductService.setProduct(this.product);
				showModal('#productListModalForm');
			}
			
			this.deleteProduct = function(){
				bootbox.dialog(deleteBootboxDialog);
			}

			this.isAdmin = App.auth.isAdmin;
		}],
		controllerAs: 'vm',
		bindToController: true,
	}
});
