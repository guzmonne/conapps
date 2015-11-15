angular.module('conapps').directive('headUser', headUser);

function headUser(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'client/views/head-user.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
	}
}

controller.$inject = ['$meteor'];

function controller($meteor){
	var vm = this;

	vm.logout = logout;

	////////////

	function logout(){
		$meteor.logout();
	}
}