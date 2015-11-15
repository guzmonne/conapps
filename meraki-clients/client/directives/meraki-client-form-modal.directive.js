angular.module('conapps').directive('merakiClientFormModal', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-clients/client/views/meraki-client-form-modal.template.ng.html',
		controller: ['ClientService', 'GuxRegisterChildrenService', function(clientService, registerChildrenService){
			registerChildrenService(this);
			this.client      = clientService.client;
			this.clientIsNew = clientService.isNew;
			this.saveClient = function(){
				this.callUpdateFunctions();
				clientService.save()
				.then(function(id){
					if (clientService.isNew())
						clientService.client._id = id
				}.bind(this));
			}.bind(this);
		}],
		controllerAs: 'modal',
		bindToController: true,
	};
});