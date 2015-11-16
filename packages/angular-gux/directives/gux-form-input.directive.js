angular.module('angular-gux').directive('guxFormInput', guxFormInput);

function guxFormInput(){
	return {
		restrict         : 'E',
		transclude       : true,
		replace          : true,
		templateUrl      : 'guzmonne_angular-gux_templates/gux-form-input.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			ngModel     : '=',
			onChange    : '&',
			type        : '@inputType',
			name        : '@inputName',
			placeholder : '@inputPlaceholder',
		},
	}
}

controller.$inject = [];

function controller(){
	var vm = this;

	vm._onChange = _onChange;

	/////////
	
	function _onChange(){
		if (vm.onChange)
			vm.onChange({model: vm.ngModel})
	}
}