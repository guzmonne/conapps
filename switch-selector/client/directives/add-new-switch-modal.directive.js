angular.module('switch-selector').directive('addNewSwitchModal', function(){
	return {
		restrict    : 'E',
		replace     : true,
		templateUrl : 'switch-selector/client/views/add-new-switch-modal-template.ng.html',
		scope: {
			switch: '='
		},
		controller  : ['$meteor', function($meteor){
			var self = this;

			self.brandOptions     = ['CISCO', 'HP', 'JUNIPER'];
			self.portOptions      = [8, 12, 16, 24, 48];
			self.portSpeedOptions = ['100 Mbps', '1 Gbps', '10 Gbps'];

			self.save = function(e){
				e.preventDefault();
				$meteor.call('addSwitch', self.switch)
				.then(function(result){
					toastr.success('Se ha añadido el nuevo switch.', 'Exito!');
					self.switch = {};
				})
				.catch(function(err){
					toastr.error('Se ha producido un error inesperado', 'Error!');
					console.log(err);
				});
			}
		}],
		controllerAs: 'addSwitchCtrl',
		bindToController: true,
	}
});