angular.module('conapps').directive('estimatesIndexTable', estimatesIndexTable);

function estimatesIndexTable(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-index-table.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			options    : '=',
			collection : '='
		},
	}
}

controller.$inject = [];

function controller(){
	var vm = this;

	vm.chevronIfSorting = chevronIfSorting;
	vm.sortBy = sortBy;           

	//////////

	function chevronIfSorting(field){
		if (vm.options && vm.options.sort === field)
			return (vm.options.reverse) ? 'fa fa-chevron-down' : 'fa fa-chevron-up';
		else
			return '';
	}

	function sortBy(field){
		var previousSort = vm.options.sort;

		check(field, String);

		if (!previousSort || previousSort !== field){
			vm.options.sort = field;
			vm.options.reverse = false;
		} else {
			vm.options.reverse = !vm.options.reverse;
		}
	}

}