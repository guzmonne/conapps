angular.module('switch-selector').directive('switchPanel', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel: '=',
			onEdit : '&',
		},
		templateUrl: 'switch-selector/client/views/switch-panel.template.ng.html',
		require: 'ngModel',
		bindToController: true,
		controller: ['$window', function($window){
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
				this.onEdit.call({switch: this.switch});
				console.log(this.switch);
			};
			this.openDatasheet = function(){
				$window.open(this.switch.datasheetUrl, '_blank');
			}
		}],
		controllerAs: 'panel'
	}
});