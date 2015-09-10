angular.module('switch-selector').directive('guxRadioGroup', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'switch-selector/client/views/gux-radio-group.template.ng.html',
		scope: {
			ngModel: '='
		},
		controller: function(){
			this.setValue = function(value){
				this.ngModel = value;
				console.log(value);
			}
		},
		controllerAs: 'group',
		bindToController: true,
		require: 'ngModel',
	}
});