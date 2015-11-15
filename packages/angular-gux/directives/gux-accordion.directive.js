angular.module('angular-gux').directive('guxAccordion', [
	function(){
		return {
			restrict    : 'E',
			replace     : true,
			transclude  : true,
			templateUrl : 'guzmonne_angular-gux_templates/gux-accordion.template.ng.html',
			scope: {
				accordionId: '@'
			},
			controller: ['$scope', function($scope){
				this.id = $scope.accordionId || _.uniqueId('accordion');
			}],
			controllerAs: 'accordion',
		}
	}
]);