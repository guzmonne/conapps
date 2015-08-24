angular.module('switch-selector').directive('guxSelectableItem', [
	function(){
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: 'switch-selector/client/views/gux-selectable-item.template.ng.html',
			scope: {
				ngModel : '=',
			},
			require: 'ngModel',
			controller: ['$scope', function($scope){
				this.toggle = function(e){
					this.ngModel = !this.ngModel;
				}
			}],
			controllerAs: 'selectableItem',
			bindToController: true
		}
	}
]);