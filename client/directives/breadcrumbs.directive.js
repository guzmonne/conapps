angular.module('conapps').directive('breadcrumbs', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'client/views/breadcrumbs.template.ng.html',
		controller: ['BreadcrumbsService', function(breadcrumbsService) {
			this.links = breadcrumbsService.links;
		}],
		controllerAs: 'breadcrumbs',
		link: function(scope, element){
			scope.$watch('breadcrumbs.links', function(n) {
				if (scope.breadcrumbs.links)
					scope.breadcrumbs.links = scope.breadcrumbs.links;
			}, true);
		}
	};
});