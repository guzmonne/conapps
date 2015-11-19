angular.module('conapps').directive('usersAdminNewUserForm', usersAdminNewUserForm);

function usersAdminNewUserForm(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'users-admin/client/views/users-admin-new-user-form.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {},
	}
}

controller.$inject = ['usersAdminService'];

function controller(ua){
	var vm = this;

	vm.user       = ua.model;
	vm.toggleRole = toggleRole;
	vm.hasRole    = hasRole;

	///////
	
	function toggleRole(role){
		check(role, String);

		var index = vm.user.profile.roles.indexOf(role); 

		if (index > -1)
			vm.user.profile.roles.splice(index, 1);
		else
			vm.user.profile.roles.push(role);
	}

	function hasRole(role){
		return vm.user.profile.roles.indexOf(role) > -1;
	}
}

function link (scope, element, attr){}