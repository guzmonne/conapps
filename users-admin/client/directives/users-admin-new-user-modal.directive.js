angular.module('conapps').directive('usersAdminNewUserModal', usersAdminNewUserModal);

function usersAdminNewUserModal(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'users-admin/client/views/users-admin-new-user-modal.template.ng.html',
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

	vm.user = ua.activeUser;
	vm.save = save;

	///////
	
	function save(){
		ua.save().
			then(handleSaveSuccess).
			catch(handleSaveError)
	}

	function handleSaveSuccess(result){
		if (vm.user._id)
			toastr.success('Roles Modificados', 'Usuario: ' + vm.user._id);
		else
			toastr.success('Usuario creado con exito!', 'Nuevo Usuario: ' + result);
	}

	function handleSaveError(err){
		toastr.error(err.reason, err.error);
		console.error(err);
	}

}

function link (scope, element, attr){}