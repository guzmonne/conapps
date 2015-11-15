angular.module('conapps').directive('estimatesIndex', estimatesIndex);

function estimatesIndex(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-index.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
	}
}

controller.$inject = ['$scope', 'showModal'];

function controller($scope, showModalService){
	var vm = this;

	vm.estimates = [];
	vm.options   = { sort: 'createdAt', reverse: true };

	activate();

	////////////////
	
	function activate(){
		$scope.$meteorSubscribe('estimates', getTerms())
			.then(handleSuccess)
			.catch(handleError)
	}

	function getTerms(){
		var query        = {type: 'index'};
		var sort         = $scope.getReactively('vm.options.sort');
		var reverse      = $scope.getReactively('vm.options.reverse');
		var stringSearch = $scope.getReactively('vm.options.stringSearch');
		if (sort)
			query.sort = sort;
		if (reverse)
			query.reverse = reverse;
		if (stringSearch)
			query.stringSearch = stringSearch;
		return query;
	}

	function handleSuccess(){
		vm.estimates = $scope.$meteorCollection(getEstimates, false);
	}

	function handleError(err){
		toastr.error(err.reason, err.error);
	}

	function getEstimates(){
		var parameters = Estimates.constructQuery(getTerms());
		return Estimates.find(parameters.filters, parameters.options);
	}
}