angular.module('conapps').directive('merakiClientForm', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-clients/client/views/meraki-client-form.template.ng.html',
		scope: {
			client: '=',
		},
		controller: [function(){}],
		/*
		controller: ['$scope', 'ClientService', function($scope, clientService){
			this.client = clientService.client;
		}],
		*/
		controllerAs: 'form',
		bindToController: true,
	}
});