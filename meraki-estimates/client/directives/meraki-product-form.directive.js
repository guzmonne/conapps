angular.module('conapps').directive('merakiProductForm', merakiProductForm);

function merakiProductForm(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/meraki-product-form.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			product: '='
		},
	}
}

controller.$inject = [];

function controller(){
	var vm = this;

	vm.lines = [
		'Wireless',
		'Switches',
		'Security Appliances',
		'Antennas',
		'Accesory'
	];

	vm.families = [
		'MR',
		'MS',
		'MX',
		'Z1',
		'S/F'
	];

	/////////////
}