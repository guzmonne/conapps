angular.module('conapps').directive('addNewSwitchModal', addNewSwitchModal);

function addNewSwitchModal(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'switch-selector/client/views/add-new-switch-modal-template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
	}
}

controller.$inject = ['switchSelectorService'];

function controller(sss){
	var vm = this;

	vm.switch           = sss.activeSwitch;
	vm.brandOptions     = sss.brandOptions;
	vm.portOptions      = sss.portOptions;
	vm.portSpeedOptions = sss.portSpeedOptions;
	vm.save             = sss.saveActiveSwitch;
}

/*
angular.module('conapps').directive('addNewSwitchModal', function(){
	return {
		restrict    : 'E',
		replace     : true,
		templateUrl : 'switch-selector/client/views/add-new-switch-modal-template.ng.html',
		scope: {
			switch: '='
		},
		controller  : ['$meteor', function($meteor){
			var self = this;



			self.save = function(e){
				e.preventDefault();
				var method, msg;
				if (self.switch._id){
					method = 'updateSwitch';
					msg    = 'Switch Actualizado.';
				} else {
					method = 'addSwitch';
					msg    = 'Switch Creado';
				}
				$meteor.
					call(method, self.switch).
					then(function(result){
						toastr.success(msg, 'Exito!');
						if (self.switch._id) return;
						self.switch = {};
					}).
					catch(function(err){
						toastr.error('Se ha producido un error inesperado', 'Error!');
						console.log(err);
					});
			}
		}],
		controllerAs: 'addSwitchCtrl',
		bindToController: true,
	}
});
*/