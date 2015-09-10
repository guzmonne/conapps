angular.module('switch-selector').directive('guxFormSelect', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		bindToController: true,
		require: 'ngModel',
		templateUrl: 'switch-selector/client/views/gux-form-select.template.ng.html',
		scope: {
			ngModel          : '=',
			name             : '@selectName',
			options          : '=selectOptions',
			defaultValue     : '@defaultValue',
			defaultValueText : '@defaultValueText',
		},
		controller: [function(){
			var self = this;

			self.defaultValue = (!!self.defaultValue) ? '0' : self.defaultValue;
			self.defaultValue = (!!self.defaultValueText) ? '---' : self.defaultValueText;
		}],
		controllerAs: 'guxFormSelect',
	};
});