angular.module('conapps').service('showMerakiClientFormModal', [
	'$q', 'ClientService',
	function($q, clientService){
		return function(client, modalId){
			var deferred = $q.defer();
			modalId || (modalId = '#addNewClientModal');
			if (client)
				clientService.setClient(client);
			else
				clientService.resetClient();
			$(modalId)
			.modal('toggle')
			.on('shown.bs.modal', function(){
				deferred.resolve();
			});
			return deferred.promise;
		}
	}
]);