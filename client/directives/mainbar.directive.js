angular.module('switch-selector').directive('mainbar', [
	function(){
		return {
			restrict    : 'E',
			replace     : true,
			templateUrl : 'client/views/mainbar.template.ng.html',
			controller  : ['$scope', 
				function($scope){
					var self = this;
					self.style = {'margin-left': '0px'};
					$scope.$on('toggle:sidebar', function(events, isVisible){
						self.style = (isVisible === true) ?
							{ 'margin-left': '180px' } :
							{ 'margin-left': '0px' };
					});
				}
			],
			controllerAs: 'mainbar',		
		}
	}
]);