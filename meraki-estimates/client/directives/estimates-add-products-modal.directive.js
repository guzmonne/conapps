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
			products: '='
		},
	}
}

controller.$inject = ['$scope'];

function controller($scope){
	var vm = this;

	vm.line     = ''

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
		
		console.log(query);

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
		return MerakiProducts.find(parameters.filters, parameters.options);
	}

}