angular.module('conapps').directive('merakiClientRow', function(){
	return {
		restrict: 'A',
		replace: 'true',
		templateUrl: 'meraki-clients/client/views/meraki-client-row.template.ng.html',
		scope: {
			'client': '='
		},
		controller: ['showMerakiClientFormModal', function(showModal){
			this.showModal = showModal;
			this.showVcardModal = function(client){
				showModal(client, '#vCardClientModal');
			};
		}],
		controllerAs: 'row',
		bindToController: true,
	};
});