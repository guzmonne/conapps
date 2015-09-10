angular.module('switch-selector').directive('switchPanel', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel: '=',
		},
		templateUrl: 'switch-selector/client/views/switch-panel.template.ng.html',
		require: 'ngModel',
		bindToController: true,
		controller: [function(){
			this.switch = this.ngModel;
			this.switchCopperPorts = function(){
				var portSpeed = '10/100';
				if (this.switch.portSpeed === '1 Gbps')
					portSpeed = '10/100/1000';
				if (this.switch.portSpeed === '10 Gbps')
					portSpeed = '10G'
				return this.switch.ports + 'x ' + portSpeed + 'BASE-T';
			};
			this.uplinkPorts = function(){
				return 	this.switch.uplinkPorts + 
								'x ' + 
								this.switch.uplink
			};
			this.editSwitch = function(){
				
			};
		}],
		controllerAs: 'panel'
	}
});