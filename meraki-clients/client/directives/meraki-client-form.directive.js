angular.module('conapps').directive('merakiClientForm', merakiClientForm);

merakiClientForm.$inject = ['merakiClientsService']

function merakiClientForm(mc){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-clients/client/views/meraki-client-form.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
		link: function(scope){
			scope.$watch('vm.remoteAddMethods', pushOnSaveMethods, true);

			scope.$on('$destroy', () => mc.onSaveMethods = []);

			/////////

			function pushOnSaveMethods(methods){
				let array = [];

				for (method in methods){
					array.push(methods[method]);

					mc.onSaveMethods = array;
				}
			}

		}
	}
}

controller.$inject = ['merakiClientsService'];

function controller(mc){
	let vm = this;

	vm.client = mc.model;

	vm.remoteAddMethods = {
		addPhone: null,
		addEmail: null,
		addAddress: null
	};
}