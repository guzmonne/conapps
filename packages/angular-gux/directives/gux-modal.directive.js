angular.module('angular-gux').directive('guxModal', guxModal);

function guxModal(){
	return {
		restrict         : 'E',
		replace          : true,
		transclude       : true,
		templateUrl      : 'guzmonne_angular-gux_templates/gux-modal.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {
			modalId: '@id'
		},
	}
}

controller.$inject = [];

function controller(){
	
}

function link (scope, element, attr){}