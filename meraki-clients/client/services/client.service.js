angular.module('conapps').service('clientService', clientService);

clientService.$inject = ['$meteor', '$q'];

function clientService($meteor, $q){
	var service = {

		resetClient(){
			service.setClient(defaultClient());
		},

		setClient(client){
			check(client, Object);

			client = _.extend(defaultClient(), client);

			angular.copy(client, service.client);
		},

		isNew(){
			return !(service.client && service.client._id);
		},

		save(callback){
			var method = service.isNew() ? 'addClient' : 'updateClient';

			return $meteor.call(method, service.client)
				.then(result => {
					if (method === 'updateClient')
						toastr.success('Cliente actualizado.', '¡Ok!');

					if (method === 'addClient')
						toastr.success('Cliente creado', '¡Ok!');

					return result;
				})
				.catch(err => {
					var deferred = $q.defer().reject(err);

					toastr.error(err.reason, err.error);

					return deferred.promise;
				});
		},

		deleteClient(clientId){
			check(clientId, String);

			return $meteor.call('meraki-clients:delete', clientId)
				.then(result => {
					toastr.success('Cliente eliminado.', '¡Ok!');
					return result;
				})
				.catch(err => {
					var rejected = $q.defer().reject(err);
					
					toastr.error(err.reason, err.error);

					return rejected;
				});
		},

		////////////
		
		client: defaultClient(),

	};

	/////////
	
	function defaultClient(){
		return {
			phones: [],
			emails: [],
			addresses: [] 
		};
	}

	/////////

	return service
}