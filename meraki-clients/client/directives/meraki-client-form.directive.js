angular.module('conapps').directive('merakiClientForm', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-clients/client/views/meraki-client-form.template.ng.html',
		scope: {
			client: '=',
		},
		controller: [function(){}],
		controllerAs: 'form',
		bindToController: true,
	}
});