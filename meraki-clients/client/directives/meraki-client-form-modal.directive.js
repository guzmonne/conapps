angular.module('conapps').directive('merakiClientFormModal', merakiClientFormModal);

function merakiClientFormModal(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-clients/client/views/meraki-client-form-modal.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
	}
}

controller.$inject = ['merakiClientsService', 'GuxRegisterChildrenService'];

function controller(mc, registerChildren){
	let vm = this;

	vm.client = mc.model;
	vm.clientIsNew = clientIsNew;
	vm.saveClient = saveClient;

	activate();

	////////
	
	function activate(){
		registerChildren(vm);
	}	

	function clientIsNew(){
		return !vm.client._id;
	}

	function saveClient(){
		vm.callUpdateFunctions();

		mc.save().
			then(id => {
				if (clientIsNew())
					vm.client._id = id;
			});
	}
}