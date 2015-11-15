angular.module('angular-gux').directive('guxRadioGroup', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'guzmonne_angular-gux_templates/gux-radio-group.template.ng.html',
		scope: {
			ngModel: '='
		},
		controller: function(){
			this.setValue = function(value){
				this.ngModel = value;
			}
		},
		controllerAs: 'group',
		bindToController: true,
		require: 'ngModel',
	}
});