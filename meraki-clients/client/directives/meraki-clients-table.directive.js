angular.module('conapps').directive('merakiClientsTable', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {
			clients: '=',
		},
		templateUrl: 'meraki-clients/client/views/meraki-clients-table.template.ng.html',
		controller: [function(){}],
		controllerAs: 'table',
		bindToController: true,
	};
});