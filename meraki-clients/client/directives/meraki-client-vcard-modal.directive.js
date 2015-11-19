angular.module('conapps').directive('merakiClientVcardModal', merakiClientVcardModal);

function merakiClientVcardModal(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-clients/client/views/meraki-client-vcard-modal.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {},
	}
}

controller.$inject = ['merakiClientsService'];

function controller(mc){
	let vm = this;

	vm.client = mc.model;
	vm.store = {};

	vm.downloadVCard = downloadVCard;
	vm.makeCode = makeCode;
	vm.toggleValue = toggleValue;
	vm.isUndefined = isUndefined;

	/////////
	
	function downloadVCard(){
		let blob = new Blob(
			[vCard(vm.client)]
		, { type: 'text/vcard' }
		);

		saveAs(blob, vm.client.fullName + ' - Tarjeta.vcf');
	}

	function makeCode(){
		if (vm.qrcode)
			vm.qrcode.clear();
		else
			vm.qrcode = new QRcode('qrcode', { width: 300, height: 300 });

		let card = vCard(vm.clientClone);

		vm.qrcode.makeCode(card);
	}

	function toggleValue(key, index){

		if (this.store[key] && this.store[key][index]){

			vm.clientClone[key].splice(index, 0, vm.store[key][index]);
			delete this.store[key][index];

		} else {

			let array = Array.apply(vm, vm.client[key]);

			vm.store[key] || (vm.store[key] = {});
			vm.store[key][index] = array.splice(index, 1)[0];
			vm.clientClone[key] = array;
		}

		vm.makeCode();

	}

	function isUndefined(key, index){
		return angular.isUndefined(vm.store[key]) || angular.isUndefined(vm.store[key][index]);
	}
	
}

function link (scope, element){
	scope.$watch('vm.client', function(){
		
		if (element.find('#qrcode') && element.find('#qrcode').hasClass('in'))
			scope.vm.makeCode();
		
		scope.vm.clientClone = angular.copy(scope.vm.client);
		scope.vm.store = {};
	
	}, true);
}