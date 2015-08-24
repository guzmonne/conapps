angular.module('switch-selector').directive('sidebar', [
	function(){
		return {
			templateUrl : 'client/views/sidebar.template.ng.html',
			restrict    : 'E',
			replace     : true,
		}
	}
]);