angular.module('conapps').directive('estimatesAddProductsModal', estimatesAddProductsModal);

function estimatesAddProductsModal(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-add-products-modal.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			estimate: '='
		},
	}
}

controller.$inject = ['$scope'];

function controller($scope){
	var vm = this;

	vm.line           = '';
	vm.showSelected   = false;
	vm.updateEstimate = updateEstimate;
	vm.products       = [];

	activate();

	//////////
	
	function activate(){
		$scope.$meteorSubscribe('merakiProducts', getTerms())
			.then(handleSuccess)
			.catch(handleError);
	}

	function getTerms(){
		var query = {type: 'index-by-line'};
		var line  = $scope.getReactively('vm.line');
		
		if (line)
			query.line = line;

		return query;
	}
	
	function handleSuccess(){
		vm.availableProducts = $scope.$meteorCollection(getMerakiProducts, false);
	}

	function handleError(err){
		toastr.error(err.reason, err.error);
	}


	function getMerakiProducts(){
		var parameters = MerakiProducts.constructQuery(getTerms());
		parameters.filters.line || (parameters.filters.line = {$not: 'License'});
		parameters.options.sort = {line: 1};
		return MerakiProducts.find(parameters.filters, parameters.options);
	}

	function updateEstimate(){
		vm.estimate.products || (vm.estimate.products = []);
		_.each(vm.products, function(p){
			vm.estimate.products.push(p);
		});
		closeModal();
	}

	function closeModal(){
		$('#estimatesAddProductsModal').modal('toggle');
	}
}