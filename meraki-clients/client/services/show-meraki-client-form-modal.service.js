angular.module('conapps').service('showMerakiClientFormModal', [
	'showModal', 'ClientService',
	function(showModal, clientService){
		return function(client, modalId){
			modalId || (modalId = '#addNewClientModal');
			if (client)
				clientService.setClient(client);
			else
				clientService.resetClient();
			return showModal(modalId);
		}
	}
]);