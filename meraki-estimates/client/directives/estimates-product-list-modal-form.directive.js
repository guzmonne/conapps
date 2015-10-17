angular.module('conapps').directive('estimatesProductListModalForm', estimatesProductListModalForm);

function estimatesProductListModalForm(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-product-list-modal-form.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
	}
}

controller.$inject = ['callSaveMethod', 'merakiProductService'];

function controller(callSaveMethod, merakiProduct){
	var vm = this;

	vm.product      = merakiProduct.product;
	vm.productIsNew = productIsNew;
	vm.saveProduct  = saveProduct;

	////////////

	var options = {
		createMethod  : 'createMerakiProduct',
		updateMethod  : 'updateMerakiProduct',
		createMessage : 'Producto creado.',
		updateMessage : 'Producto actualizado.'
	}

	function productIsNew(){
		return !(vm.product && vm.product._id);
	}

	function saveProduct(){
		callSaveMethod(vm.product, options)
			.then(handleSuccess)
	}

	function handleSuccess(result){
		if (vm.productIsNew())
			vm.product = merakiProduct.setDefault();
	}

}