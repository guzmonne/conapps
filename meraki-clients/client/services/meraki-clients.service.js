angular.module('conapps').service('merakiClientsService', merakiClientsService);

merakiClientsService.$inject = ['collectionManagerGenerator'];

function merakiClientsService(cmg){
	let service = new cmg({
		sort: {fullName: 1},
		publication: 'clients',
		mongoCollection: Clients,
		defaults: defaults,
		stringSearch: true,
		saveMethod: 'addClient',
		updateMethod: 'updateClient',
		deleteMethod: 'meraki-clients:delete'
	});

	angular.extend(service, {

		save(){
			let _super = cmg.prototype.save;

			if (angular.isArray(this.onSaveMethods))
				this.onSaveMethods.forEach(method => {

					if (angular.isFunction(method))
						method();

				});

			return _super.call(this);
		},

		/////////
		
		onSaveMethods: [],

	});

	//////////

	function defaults(){
		return {
			phones: [],
			emails: [],
			addresses: []
		}
	}

	///////////
	
	return service;
}