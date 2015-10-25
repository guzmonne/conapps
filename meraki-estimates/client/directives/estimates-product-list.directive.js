angular.module('conapps').directive('estimatesProductList', estimatesProductList);

function estimatesProductList(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-product-list.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {},
	}
}

controller.$inject = ['$scope'];

function controller($scope){
	var vm = this;

	vm.products     = [];
	vm.stringSearch = '';

	activate();

	/////////////

	function activate(){
		$scope.$meteorSubscribe('merakiProducts', getTerms())
			.then(handleSuccess)
			.catch(handleError)
	}

	function getTerms(){
		var query        = {type: 'index'};
		var stringSearch = $scope.getReactively('vm.stringSearch', true);

		if (stringSearch)
			query.stringSearch = stringSearch;

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
		parameters.filters.line = {$not: 'License'};
		parameters.options.sort = {line: -1};
		return MerakiProducts.find(parameters.filters, parameters.options);
	}
}

function link(scope, element){
	element.find('#spinner').append(App.spinner.el);
}