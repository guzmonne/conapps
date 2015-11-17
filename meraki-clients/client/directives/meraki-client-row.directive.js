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

controller.$inject = ['clientService', 'showModal', 'bootboxService'];

function controller(cs, showModal, bs){
	var vm = this;

	vm.showModal = showEditModal;
	vm.showVcardModal = showVcardModal;
	vm.deleteClient = deleteClient;

	////////////
	
	function deleteClient(clientId){
		check(clientId, String);

		bs.confirmClientDeletion().
			then(() => {
				cs.deleteClient(clientId);
			})
	}

	function showEditModal(client){
		cs.setClient(client);
		showModal('#addNewClientModal');
	}
	
	function showVcardModal(client){
		cs.setClient(client);
		showModal('#vCardClientModal');
	}

}