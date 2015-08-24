angular.module('switch-selector').directive('mainbar', [
	function(){
		return {
			restrict    : 'E',
			replace     : true,
			templateUrl : 'client/views/mainbar.template.ng.html'
		}
	}
]);