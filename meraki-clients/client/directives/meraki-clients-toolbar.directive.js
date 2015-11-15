angular.module('conapps').directive('merakiClientsToolbar', function(){
	return {
		restrict: 'E',
		replace : true,
		templateUrl: 'meraki-clients/client/views/meraki-clients-toolbar.template.ng.html',
	};
});