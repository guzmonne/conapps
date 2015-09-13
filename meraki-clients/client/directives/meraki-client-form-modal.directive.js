angular.module('conapps').directive('merakiClientFormModal', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-clients/client/views/meraki-client-form-modal.template.ng.html',
		controller: ['ClientService', 'GuxRegisterChildrenService', function(clientService, registerChildrenService){
			registerChildrenService(this);
			console.log(this);
			this.saveClient = function(){
				console.log(this);
				_.forEach(this.updateFunctions, function(fn){
					fn.call();
				});
			}.bind(this);
		}],
		controllerAs: 'modal',
		bindToController: true,
	};
});