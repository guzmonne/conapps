angular.module('conapps').service('ClientService', [
	function(){
		function defaultClient(){
			return {
				phones: [],
				emails: [],
				addresses: []
			};
		}

		var api = {
			client: defaultClient(),
			defaultClient: defaultClient,
			resetClient: function(){
				this.clien = this.defaultClient();
			}.bind(api),
			setClient: function(client){
				if (!angular.isObject(client)) return;
				this.client = _.extend(client, this.defaultClient());
			}.bind(api)
		};

		return api;	
	}
]);