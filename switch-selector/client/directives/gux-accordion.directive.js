angular.module('switch-selector').directive('guxAccordion', [
	function(){
		return {
			restrict    : 'E',
			replace     : true,
			transclude  : true,
			templateUrl : 'switch-selector/client/views/gux-accordion.template.ng.html',
			scope: {
				accordionId: '@'
			},
			controller: ['$scope', function($scope){
				this.id = $scope.accordionId || _.uniqueId('accordion');
			}],
			controllerAs: 'accordion',
			link: function(scope, element, attrs){
				//angular.element(element).attr('id', scope.accordion.id);
			}
		}
	}
]);