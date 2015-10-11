angular.module('conapps').directive('productInterfaceSelector', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'client/views/product-interface-selector.template.ng.html',
		scope: {
			interfaces: '=',
		},
		controller: [function(){
			this.options = [
				'GE'
			];
			this.interfaces || (this.interfaces = []);

		}],
		controllerAs: 'productInterfaceSelector',
		bindToController: true,
	};
});