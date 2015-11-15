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
		link: function(scope, element, attrs){
			if (attrs.icon)
				element.find('.page-content > .single-head > h3 > i').removeClass().addClass(attrs.icon);
		}
	};
});