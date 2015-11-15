angular.module('conapps').directive('switchSelectorFilters', switchSelectorFilters);

function switchSelectorFilters(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'switch-selector/client/views/switch-selector-filters.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
		link             : link
	}
}

controller.$inject = ['switchSelectorService'];

function controller(sss){
	var vm = this;

	vm.filters      = sss.filters;
	vm.refresh      = sss.refresh;
	vm.resetFilters = sss.resetFilters;
	vm.deleteFilter = sss.deleteFilter;
}


function link(scope){

	scope.$watch('vm.filters', function(){
		if (scope.vm.filters.ports)
			scope.vm.filters.ports = parseInt(scope.vm.filters.ports);
		scope.vm.refresh();
	}, true);

}