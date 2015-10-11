angular.module('conapps').directive('merakiProductAttributesForm', function(){
	return {
		restrict: 'E',
		replace: true,
		template: '<div ng-show="vm.isRequired()" ng-include="vm.template"></div>',
		scope: {
			line       : '=',
			product    : '=',
		},
		controller: [function(){
			var validLines = [
				'Wireless',
				'Switches',
				'Security Appliances',
				'Antennas'
			];

			this.standards    = ['802.11ac/n', '802.11n'];
			this.mimoOptions  = ['2x2', '3x3', '4x3', '4x4'];
			this.antennaTypes = ['Omni', 'Sector', 'Patch'];

			this.isRequired = function(){
				return validLines.indexOf(this.line) > -1;
			}; 
		}],
		controllerAs: 'vm',
		bindToController: true,
		link: function(scope){
			scope.$watch('vm.line', function(line){
				var vm = scope.vm;
				if (vm.product && !vm.product._id)
					vm.product.attributes = {};
				if (!angular.isString(line)) return;
				if (vm.isRequired(line))
					vm.template = [
						'meraki-estimates/client/views/meraki-product-attributes-form-for-',
						line.replace(' ', '-').toLowerCase(),
						'.template.ng.html'
					].join('');
			});
		}
	};
});