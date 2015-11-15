angular.module('conapps').directive('searchInput', searchInput);

function searchInput(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'client/views/search-input.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			ngModel        : '=',
			ngModelOptions : '=',
			onChange       : '&'
		},
		require          : 'ngModel'
	}
}

controller.$inject = [];

function controller(){
	var vm = this;

	activate()

	/////////
	
	function activate(){
		vm.onChange || (vm.onChange = function(){});
	}
}