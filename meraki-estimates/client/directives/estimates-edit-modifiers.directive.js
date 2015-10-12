angular.module('conapps').directive('estimatesEditModifiers', estimatesEditModifiers);

function estimatesEditModifiers(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-edit-modifiers.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {
			modifiers: '='
		},
	}
}

controller.$inject = [];

function controller(){
	var vm = this;
}

function link (scope, element, attr){}