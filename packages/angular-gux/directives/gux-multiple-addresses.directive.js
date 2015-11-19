angular.module('angular-gux').directive('guxMultipleAddresses', guxMultipleAddresses);

function guxMultipleAddresses(){
	return {
		restrict         : 'E',
		replace          : true,
		transclude       : true,
		templateUrl      : 'guzmonne_angular-gux_templates/gux-multiple-addresses.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			addresses: '=ngModel',
			inputStreetName: '@',
			maxAddresses: '@',
			remoteAddAddress: '='
		},
		require: 'ngModel'
	}
}

function controller(){
	var vm = this;

	vm.newAddress = {};

	vm.addAddress = addAddress;
	vm.canAddAddress = canAddAddress;
	vm.removeAddress = removeAddress;
	vm.editAddress = editAddress;

	activate();

	/////////
	
	function activate(){
		vm.maxAddresses || (vm.maxAddresses = 3);
		vm.inputStreetName 	|| (vm.inputStreetName = 'newStreet');

		if (vm.remoteAddAddress || vm.remoteAddAddress === null)
			vm.remoteAddAddress = addAddress;
	}

	function addAddress(){
		if (!vm.newAddress.street || !vm.newAddress.street === '') return;

		vm.addresses.push(vm.newAddress);

		vm.newAddress = {};

		focusOnStreetInput();
	}

	function canAddAddress(){
		var maxAddresses;

		if (!angular.isArray(vm.addresses)) return false;

		maxAddresses = parseInt(vm.maxAddresses);

		return this.addresses.length < maxAddresses;
	}

	function removeAddress(index){
		if (!angular.isArray(vm.addresses)) return;

		vm.addresses.splice(index, 1);

		focusOnStreetInput();
	}

	function editAddress(address, index){
		vm.removeAddress(index);
		vm.addAddress();
		
		vm.newAddress = address;
		
		focusOnStreetInput();
	}

	function focusOnStreetInput(){
		$('[name="'+ vm.inputStreetName +'"]').focus();
	}
}
