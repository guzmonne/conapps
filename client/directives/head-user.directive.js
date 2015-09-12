angular.module('conapps').directive('headUser', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'client/views/head-user.template.ng.html',
		controller: ['$meteor', function($meteor){
			var self = this;

			self.logout = function(){
				$meteor.logout();
			}
		}],
		controllerAs: 'head',
	};
});