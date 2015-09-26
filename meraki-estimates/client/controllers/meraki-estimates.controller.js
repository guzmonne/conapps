angular.module('conapps').controller('MerakiEstimatesCtrl', [
	'BreadcrumbsService',
	function(breadcrumbsService){
		breadcrumbsService.setLinks([
			{name: 'Home', address: '/'},
			{name: 'Meraki Estimates', address: '/meraki_estimates'},
			{name: 'WorkSpace'},
		]);
	}
]);