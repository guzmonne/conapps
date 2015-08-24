angular.module('switch-selector').directive('mainbarHead', [
	function(){
		return {
			restrict    : 'E',
			templateUrl : 'client/views/mainbar-head.template.ng.html',
			replace     : true
		}
	}
]);