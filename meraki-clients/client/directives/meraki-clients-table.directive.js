angular.module('conapps').directive('merakiClientsTable', merakiClientsTable);

merakiClientsTable.$inject = ['merakiClientsService', 'tableLink'];

function merakiClientsTable(mc, tl){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-clients/client/views/meraki-clients-table.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : tl(mc),
		scope            : {},
	}
}

controller.$inject = ['merakiClientsService'];

function controller(mc){
	var vm = this;

	vm.clients = mc.collection;

	activate();

	/////////
	
	function activate(){
		mc.getCollection();
	}
}