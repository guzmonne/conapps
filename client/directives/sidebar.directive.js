angular.module('switch-selector').directive('sidebar', [
	function(){
		return {
			templateUrl : 'client/views/sidebar.template.ng.html',
			restrict    : 'E',
			replace     : true,
			controller  : ['$scope', 
				function($scope){
					var self = this;
					self.style = {display: 'none'};
					$scope.$on('toggle:sidebar', function(events, isVisible){
						self.style = (isVisible === true) ?
							{ display: 'block' } :
							{ display: 'none' };
					});
				}
			],
			controllerAs: 'sidebar'
		}
	}
]);