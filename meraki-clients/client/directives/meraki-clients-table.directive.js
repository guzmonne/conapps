angular.module('conapps').directive('merakiClientsTable', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-clients/client/views/meraki-clients-table.template.ng.html',
	};
});