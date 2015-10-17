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
			products   : '=',
			product    : '=',
			editable   : '@',
			selectable : '@',
		},
	}
}

controller.$inject = ['$scope', 'bootboxService', 'merakiProductService', 'showModal'];

function controller($scope, bs, merakiProduct, showModal){
	var vm = this;

	vm.isAdmin       = App.auth.isAdmin;
	vm.deleteProduct = deleteProduct;
	vm.editProduct   = editProduct;
	vm.modQty        = modQty;
	vm.addProduct    = addProduct;
	vm.removeProduct = removeProduct;
	vm.prodHasQty    = prodHasQty;

	vm.quantity || (vm.quantity = 1);

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

	function modQty(ammount){
		ammount = parseInt(ammount);
		if (!angular.isNumber(ammount)) return;
		if (vm.product.quantity)
			modifyProductQuantity(ammount);
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

	function addProduct(){
		if (productNotExists(vm.product))
			modProdQty();
		else
			pushProduct();
	}

	// Object    -> true  -> false
	// Undefined -> false -> true
	function productNotExists(product){
		return !!findProduct(product._id);
	}

	function findProduct(_id){
		return _.find(vm.products, function(p){ return p._id === _id });	
	}

	function modProdQty(){
		var product = findProduct(vm.product._id); 
		product.quantity += parseInt(vm.quantity);
	}

	function pushProduct(){
		angular.isArray(vm.products) || (vm.products = []);
		product = angular.copy(vm.product);
		product.quantity = parseInt(vm.quantity);
		vm.products.push(product);
	}

	function removeProduct(){
		bs.confirmProductRemove()
			.then(function(){
				filterProduct(vm.product._id);
			});
	}

	function filterProduct(_id){
		vm.products = _.filter(vm.products, function(p){ p._id !== _id });
	}

	function prodHasQty(){
		return (vm.product.quantity && angular.isNumber(vm.product.quantity))
	}
}

function link (scope, element, attr){}