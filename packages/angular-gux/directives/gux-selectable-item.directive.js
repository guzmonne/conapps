angular.module('angular-gux').directive('guxSelectableItem', [
	function(){
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: 'guzmonne_angular-gux_templates/gux-selectable-item.template.ng.html',
			scope: {
				ngModel   : '=',
			},
			require: ['ngModel'],
			controller: ['$scope', function($scope){
				this.toggle = function(e){
					e.preventDefault();
					this.ngModel = !this.ngModel;
				}
			}],
			controllerAs     : 'selectableItem',
			bindToController : true
		}
	}
]);