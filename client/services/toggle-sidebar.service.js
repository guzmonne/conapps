angular.module('switch-selector').service('ToggleSidebar', [
	'$rootScope',
	function($rootScope){
		var ToggleSidebar = {
			visible: false
		};

		var toggle = function() {
			this.visible = !this.visible;
			$rootScope.$broadcast('toggle:sidebar', this.visible);
		};

		return {
			visible: true,
			toggle : toggle.bind(ToggleSidebar),
		};
	}
]);