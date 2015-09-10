angular.module('switch-selector').directive('mainbarHead', [
	function(){
		return {
			restrict    : 'E',
			templateUrl : 'client/views/mainbar-head.template.ng.html',
			replace     : true,
			controller  : ['ToggleSidebar', function(sidebar){
				this.toggleSidebar = sidebar.toggle;
			}],
			controllerAs: 'header'
		}
	}
]);