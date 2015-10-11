angular.module('conapps').directive('merakiProductAttributesForm', function(){
	return {
		restrict: 'E',
		replace: true,
		template: '<div ng-show="merakiProductAttributesForm.isRequired()" ng-include="merakiProductAttributesForm.template"></div>',
		scope: {
			line       : '=',
			attributes : '=',
		},
		controller: [function(){
			var validLines = [
				'Wireless',
				'Switches',
				'Security Appliances',
				'Antenas'
			];

			this.standards = ['802.11ac/n', '802.11n'];
			this.mimoOptions = ['2x2', '3x3', '4x3', '4x4'];
			this.antennaTypes = ['Omni', 'Sector', 'Patch'];

			this.isRequired = function(){
				return validLines.indexOf(this.line) > -1;
			}; 
		}],
		controllerAs: 'merakiProductAttributesForm',
		bindToController: true,
		link: function(scope){
			scope.$watch('merakiProductAttributesForm.line', function(line){
				var controller = scope.merakiProductAttributesForm;
				if (!angular.isString(line)) return;
				if (controller.isRequired(line))
					controller.template = [
						'meraki-estimates/client/views/meraki-product-attributes-form-for-',
						line.replace(' ', '-').toLowerCase(),
						'.template.ng.html'
					].join('');
			});
		}
	};
});