angular.module('conapps').directive('merakiProductAttributes', function(){
	return {
		restrict: 'E',
		replace: true,
		template: '<div ng-include="merakiProductAttributes.template"></div>',
		scope: {
			line: '@',
			attributes: '=',
		},
		controller: [function(){
			this.template = [
				'meraki-estimates/client/views/meraki-product-attributes-for-',
				this.line.replace(' ', '-').toLowerCase(),
				'.template.ng.html'
			].join('');
		}],
		controllerAs: 'merakiProductAttributes',
		bindToController: true,
	}
});