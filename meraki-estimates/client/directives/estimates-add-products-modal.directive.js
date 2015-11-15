angular.module('conapps').directive('estimatesAddProductsModal', estimatesAddProductsModal);

function estimatesAddProductsModal(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-add-products-modal.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {

		},
	}
}

controller.$inject = ['$scope', 'estimateEditService'];

function controller($scope, es){
	var vm = this;

	vm.showSelected          = false;
	vm.selectedProducts      = es.selectedProducts;
	vm.addProduct            = es.addProduct;
	vm.addProductsToEstimate = addProductsToEstimate;
	vm.cleanModal            = cleanModal;

	activate();

	//////////
	
	function activate(){
		vm.cleanModal();

		$scope.$meteorSubscribe('merakiProducts', getTerms())
			.then(handleSuccess)
			.catch(handleError);
	}

	//////////

	function getTerms(){
		var query = {type: 'index-by-line'};
		var line  = $scope.getReactively('vm.line');
		
		if (line)
			query.line = line;

		return query;
	}
	
	function handleSuccess(){
		vm.products = $scope.$meteorCollection(getMerakiProducts, false);
	}

	function handleError(err){
		toastr.error(err.reason, err.error);
	}


	function getMerakiProducts(){
		var parameters = MerakiProducts.constructQuery(getTerms());
		parameters.filters.line || (parameters.filters.line = {$not: 'License'});
		parameters.options.sort = {line: -1};
		return MerakiProducts.find(parameters.filters, parameters.options);
	}

	function addProductsToEstimate(){
		es.addProductsToEstimate()
			.then(function(result){
				vm.closeModal();
			})
	}

	function cleanModal(){
		es.cleanSelected();
	}

}

function link (scope, element){
	scope.vm.closeModal = function(){
		element.modal('toggle');
	}

	element.on('show.bs.modal', () => scope.vm.cleanModal());

	scope.$on('$destroy', () => element.off('show.bs.modal'));
}