angular.module('conapps').directive('merakiClientForm', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-clients/client/views/meraki-client-form.template.ng.html',
		controller: ['ClientService', function(clientService){
			this.client = clientService.client;
		}],
		controllerAs: 'form',
		bindToController: true,
	}
});