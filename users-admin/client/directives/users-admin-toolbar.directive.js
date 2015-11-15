angular.module('conapps').directive('usersAdminToolbar', usersAdminToolbar);

function usersAdminToolbar(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'users-admin/client/views/users-admin-toolbar.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {},
	}
}

controller.$inject = [];

function controller(){
	
}

function link (scope, element, attr){}