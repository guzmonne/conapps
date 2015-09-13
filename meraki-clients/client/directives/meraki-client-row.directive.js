angular.module('conapps').directive('merakiClientRow', function(){
	return {
		restrict: 'A',
		replace: 'true',
		templateUrl: 'meraki-clients/client/views/meraki-client-row.template.ng.html',
		scope: {
			'client': '='
		},
		controller: [function(){}],
		controllerAs: 'row',
		bindToController: true,
	};
});