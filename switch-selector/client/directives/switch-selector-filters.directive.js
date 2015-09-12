angular.module('conapps').directive('switchSelectorFilters', [
	function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'switch-selector/client/views/switch-selector-filters.template.ng.html',
		}
	}
]);