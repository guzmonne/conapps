angular.module('conapps').service('ClientService', [
	'$meteor',
	function($meteor){
		var ClientService = function(client){
			this.client = (client) ? client : this.defaultClient();
		}

		ClientService.prototype.defaultClient = function() {
			return {
				phones: [],
				emails: [],
				addresses: []
			};
		};

		ClientService.prototype.resetClient = function() {
			this.setClient(this.defaultClient());
		};

		ClientService.prototype.setClient = function(client) {
			if (!angular.isObject(client)) return;
			if (!angular.isArray(client.phones)) return;
			if (!angular.isArray(client.emails)) return;
			if (!angular.isArray(client.addresses)) return;
			angular.copy(client, this.client);
		};

		ClientService.prototype.isNew = function() {
			if (!this.client) return;
			return !this.client._id;
		};

		ClientService.prototype.save = function(callback) {
			var method = (this.client._id) ? 'updateClient' : 'addClient';
			return $meteor.call(method, this.client)
			.then(function(result){
				if (method === 'updateClient')
					toastr.success('Cliente actualizado.', 'Exito!');
				if (method === 'addClient')
					toastr.success('Cliente creado.', 'Exito');
				return result;
			}, function(err){
				toastr.error(err.reason, 'Error!');
			});
		};
		
		return new ClientService();	
	}
]);