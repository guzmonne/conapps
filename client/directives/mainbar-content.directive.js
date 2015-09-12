angular.module('conapps').directive('mainbarContent', [
	function(){
		return {
			restrict    : 'E',
			templateUrl : 'client/views/mainbar-content.template.ng.html',
			replace     : true,
		}
	}
]);