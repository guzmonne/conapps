angular.module('switch-selector').directive('guxFormInput', function(){
	return {
		restrict: 'E',
		transclude: true,
		require: 'ngModel',
		scope: {
			ngModel     : '=',
			type        : '@inputType',
			name        : '@inputName',
			placeholder : '@inputPlaceholder',
		},
		templateUrl: 'switch-selector/client/views/gux-form-input.template.ng.html',
		controller: [function(){}],
		controllerAs: 'guxFormInput',
		bindToController: true,
	};
});