angular.module('conapps').service('showMerakiClientFormModal', [
	'ClientService',
	function(clientService){
		return function(client){
			if (client)
				clientService.setClient(client);
			else
				clientService.resetClient();
			$('#addNewClientModal').modal('toggle');
		}
	}
]);