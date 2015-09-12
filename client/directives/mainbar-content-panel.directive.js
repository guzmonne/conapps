angular.module('conapps').directive('mainbarContentPanel', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'client/views/mainbar-content-panel.template.ng.html',
		scope: {
			heading: '@',
			links  : '=',
		},
		controller: [function(){}],
		controllerAs: 'panel',
		bindToController: true,
	};
});