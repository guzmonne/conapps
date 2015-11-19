angular.module('conapps').directive('merakiClientRow', merakiClientRow);

function merakiClientRow(){
	return {
		restrict         : 'A',
		replace          : true,
		templateUrl      : 'meraki-clients/client/views/meraki-client-row.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			client: '='
		}
	}
}

controller.$inject = ['merakiClientsService', 'showModal', 'bootboxService'];

function controller(mc, showModal, bs){
	var vm = this;

	vm.showModal = showEditModal;
	vm.showVcardModal = showVcardModal;
	vm.deleteClient = deleteClient;

	////////////
	
	function deleteClient(clientId){
		check(clientId, String);

		bs.confirmClientDeletion().
			then(() => {
				mc.deleteClient(clientId);
			})
	}

	function showEditModal(client){
		mc.setModel(client);
		showModal('#addNewClientModal');
	}
	
	function showVcardModal(client){
		mc.setModel(client);
		showModal('#vCardClientModal');
	}

}