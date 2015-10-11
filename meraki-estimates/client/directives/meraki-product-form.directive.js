angular.module('conapps').directive('merakiProductForm', function(){
	return {
		restrict: 'E',
		replace : true,
		templateUrl: 'meraki-estimates/client/views/meraki-product-form.template.ng.html',
		scope: {
			product: '=',
		},
		controller: [function(){
			this.lines = [
				'Wireless',
				'Switches',
				'Security Appliances',
				'Antennas',
				'Accesorios'
			];
			this.families = [
				'MR',
				'MS',
				'MX',
				'Z',
				'S/F'
			];
		}],
		controllerAs: 'merakiProductForm',
		bindToController: true,
	};
});