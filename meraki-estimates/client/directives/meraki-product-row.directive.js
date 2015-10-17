angular.module('conapps').directive('merakiProductRow', merakiProductRow);

function merakiProductRow(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/meraki-product-row.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			product: '=',
			products: '=',
		},
	}
}

controller.$inject = ['$scope', 'addProductsToEstimateService'];

function controller($scope, service){
	var vm = this;

	vm.quantity          = 1;
	vm.moreInfo          = false;
	vm.addProduct        = addProduct;
	vm.removeProduct     = removeProduct;

	/////////////
	
	function removeProduct(){
		var deleteBootboxDialog = {
			message: '¿Esta seguro que desea eliminar este producto?',
			title: 'Eliminar Producto',
			buttons: {
				confirm: {
					label: 'Aceptar',
					className: 'btn-primary',
					callback: function() {
						vm.products = _.filter(vm.products, function(p){
							return p._id !== vm.product._id; 
						});
						$scope.$apply();
					}
				},
				cancel: {
					label: 'Cancelar',
					className: 'btn-default',
				}
			}
		};
		bootbox.dialog(deleteBootboxDialog);
	}
	
	function addProduct(){
		var _product = _.find(vm.products, function(p){ 
			return p._id === vm.product._id
		});
		if (_product)
			_product.quantity += vm.quantity;
 		else {
 			var product = angular.copy(vm.product);
 			product.quantity = vm.quantity;
 			angular.isArray(vm.products) || (vm.products = []);
 			vm.products.push(product);
 		}
 		toastr.success('Producto agregado.', '¡OK!');
	} 
}