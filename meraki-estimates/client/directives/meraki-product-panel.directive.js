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
			product    : '=',
			editable   : '@',
			selectable : '@',
			onSelect   : '&',
			onRemove   : '&',
			onQtyMod   : '&',
			discount   : '=',
		},
	}
}

controller.$inject = ['$scope', 'bootboxService', 'merakiProductService', 'showModal'];

function controller($scope, bs, merakiProduct, showModal){
	var vm = this;

	vm.isAdmin       = App.auth.isAdmin;
	vm.deleteProduct = deleteProduct;
	vm.editProduct   = editProduct;
	vm.prodHasQty    = prodHasQty;
	vm.modQty        = modQty;

	vm.quantity || (vm.quantity = 1);
	vm.discount || (vm.discount = 0);

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

	function prodHasQty(){
		return (vm.product.quantity && angular.isNumber(vm.product.quantity))
	}

	function modQty(ammount){
		ammount = parseInt(ammount);
		if (!angular.isNumber(ammount)) return;
		if (vm.product.quantity) {
			modifyProductQuantity(ammount);
			if (angular.isFunction(vm.onQtyMod))
				vm.onQtyMod({attrs: {id: vm.product.id, qty: vm.product.quantity}});
		}
		else
			modifyQuantity(ammount);
	}

	function modifyProductQuantity(ammount){
		if (ammount < 0 && vm.product.quantity <= (-1 * ammount))
			vm.product.quantity = 1;
		else
			vm.product.quantity += ammount;
	}

	function modifyQuantity(ammount){
		if (ammount < 0 && vm.quantity <= (-1 * ammount))
			vm.quantity = 1;
		else
			vm.quantity += ammount;
	}
}

function link (scope, element, attr){}