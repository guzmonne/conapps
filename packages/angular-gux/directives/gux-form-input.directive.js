angular.module('angular-gux').directive('guxFormInput', function(){
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
		templateUrl: 'guzmonne_angular-gux_templates/gux-form-input.template.ng.html',
		controller: [function(){}],
		controllerAs: 'guxFormInput',
		bindToController: true,
	};
});