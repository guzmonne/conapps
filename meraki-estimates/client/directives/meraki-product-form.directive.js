angular.module('conapps').directive('merakiProductForm', function(){
	return {
		restrict: 'E',
		replace : true,
		templateUrl: 'meraki-estimates/client/views/meraki-product-form.template.ng.html',
		scope: {
			product: '=',
		},
		controller: [function(){
			this.lines    = lines;
			this.families = families;
		}],
		controllerAs: 'merakiProductForm',
		bindToController: true,
		link: function(scope){
			scope.$watch('merakiProductForm.product.line', updateFamily.bind(scope));
		}
	};
});

var lines = [
	'Wireless',
	'Switches',
	'Security Appliances',
	'Antennas',
	'Accesorios'
];

var families = [
	'MR',
	'MS',
	'MX',
	'Z',
	'S/F'
];

function updateFamily(){
	var vm = this.merakiProductForm;
	if (!vm.product || !vm.product.line)
		return;
	if (vm.product.line === 'Wireless')
		vm.product.family = 'MR';
	if (vm.product.line === 'Switches'){
		vm.product.family = 'MS';
	}
	if (vm.product.line === 'Security Appliances'){
		vm.product.family = 'MX';
	}
	if (vm.product.line === 'Accesorios')
		vm.product.family = 'S/F';
}