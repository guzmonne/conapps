angular.module('conapps').directive('estimatesAddProductsModal', estimatesAddProductsModal);

function estimatesAddProductsModal(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-add-products-modal.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
	}
}

controller.$inject = ['$scope'];

function controller($scope){
	var vm = this;

	vm.line     = ''
	vm.products = [];

	activate();

	//////////
	
	function activate(){
		$scope.$meteorSubscribe('merakiProducts', getTerms())
			.then(handleSuccess)
			.catch(handleError);
	}

	function defaultTerms(){
		return MerakiProducts.constructQuery({type: 'index'});
	}

	function handleSuccess(){
		vm.products = $scope.$meteorCollection(setMerakiProducts, false);
	}

	function handleError(err){
		toastr.error(err.reason, err.error);
	}

	function getTerms(){
		var query = {type: 'index-by-line'};
		var line  = $scope.getReactively('vm.line');
		if (line)
			query.line = line;
		return query;
	}

	function setMerakiProducts(){
		var parameters = MerakiProducts.constructQuery(getTerms());
		return MerakiProducts.find(parameters.filters, parameters.options);
	}

}