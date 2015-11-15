angular.module('angular-gux').directive('guxAddress', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'guzmonne_angular-gux_templates/gux-address.template.ng.html',
		scope: {
			address: '='
		},
		controller: [function(){}],
		controllerAs: 'ctrl',
		bindToController: true
	};
});