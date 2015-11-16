angular.module('conapps').directive('addNewSwitchModal', addNewSwitchModal);

function addNewSwitchModal(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'switch-selector/client/views/add-new-switch-modal-template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
	}
}

controller.$inject = ['switchSelectorService'];

function controller(sss){
	var vm = this;

	vm.switch           = sss.activeSwitch;
	vm.brandOptions     = sss.brandOptions;
	vm.portOptions      = sss.portOptions;
	vm.portSpeedOptions = sss.portSpeedOptions;
	vm.save             = sss.saveActiveSwitch;
}