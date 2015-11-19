angular.module('conapps').controller('MerakiClientsIndexCtrl', ['BreadcrumbsService',
	function(breadcrumbsService){
		var self = this;
		
		breadcrumbsService.links = [
			{name: 'Home', address: '/'},
			{name: 'Meraki Clients', address: '/meraki_clients'},
			{name: 'Index'},
		];
	}
]);