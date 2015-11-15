angular.module('conapps').controller('LoginCtrl', [
	'$meteor', '$state',
	function($meteor, $state){
		var self = this;
		this.user = {};
		
		self.loginUser = function(){
			if (!self.user.username || !self.user.password) return;
			$meteor.loginWithPassword(self.user.username, self.user.password)
				.then(function(){
					$state.go('switch_selector');
				});
		};
	}
]);