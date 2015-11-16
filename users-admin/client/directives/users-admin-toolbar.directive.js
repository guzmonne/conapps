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

controller.$inject = ['usersAdminService', 'showModal'];

function controller(ua, showModal){
	var vm = this;

	vm.showModal = _showModal;

	///////
	
	function _showModal(){
		showModal('#newUserModal', setDefaultUserBeforeModal);
	}

	function setDefaultUserBeforeModal(){
		ua.setDefault();
	}
}

function link (scope, element, attr){}