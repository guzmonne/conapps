angular.module('switch-selector').directive('outer', [
	function(){
		return {
			restrict    : 'E',
			replace     : true,
			templateUrl : 'client/views/outer.template.ng.html'
		}
	}
]);