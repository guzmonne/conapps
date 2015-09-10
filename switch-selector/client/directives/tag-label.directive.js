angular.module('switch-selector').directive('tagLabel', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'switch-selector/client/views/tag-label.template.ng.html',
		scope: {
			labelClass: '@'
		},
		controller: [function(){}],
		controllerAs: 'tag',
		bindToController: true,
	}
});