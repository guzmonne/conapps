angular.module('conapps').directive('merakiProductPanel', merakiProductPanel);

function merakiProductPanel(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/meraki-product-panel.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {
			product: '='
		},
	}
}

controller.$inject = ['bootboxService', 'merakiProductService', 'showModal'];

function controller(bs, merakiProduct, showModal){
	var vm = this;

	vm.isAdmin       = App.auth.isAdmin;
	vm.deleteProduct = deleteProduct;
	vm.editProduct   = editProduct

	///////////
	
	function deleteProduct(){
		bs.confirmProductDeletion()
			.then(function(){
				merakiProduct.deleteProduct(vm.product._id)
					.then(handleSuccess)
					.catch(handleError)
			})
			.catch(handleError);
	}

	function editProduct(){
		merakiProduct.setProduct(vm.product);
		showModal('#productListModalForm');
	}

	function handleSuccess(){
		toastr.success('Producto eliminado', 'Exito!');
	}

	function handleError(){
		toastr.error('Ha ocurrido un error inesperado', 'Error!')
	}
}

function link (scope, element, attr){}