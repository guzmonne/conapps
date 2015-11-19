angular.module('conapps').service('merakiClientsService', merakiClientsService);

merakiClientsService.$inject = ['collectionManagerGenerator'];

function merakiClientsService(cmg){
	let service = new cmg({
		sort: {fullName: 1},
		publication: 'clients',
		mongoCollection: Clients,
		saveMethod: 'addClient',
		updateMethod: 'updateClient',
		deleteMethod: 'meraki-clients:delete'
	});

	angular.extend(service, {
		setDefault: setDefault,
		model: setDefault()
	});

	function setDefault(){
		return {
			phones: [],
			emails: [],
			addresses: []
		}
	}

	///////////
	
	return service;
}