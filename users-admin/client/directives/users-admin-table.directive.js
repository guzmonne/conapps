angular.module('conapps').directive('usersAdminTable', usersAdminTable);

function usersAdminTable(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'users-admin/client/views/users-admin-table.template.ng.html',
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

	vm.unsubscribe = ua.unsubscribe;
	vm.users = ua.users;
	vm.delete = deleteUser;
	vm.edit   = edit;

	activate();

	////////
	
	function activate(){
		ua.getUsers();
	}

	function deleteUser(id){
		ua.delete(id).
			then(handleDeleteSuccess).
			catch(handleError);
	}

	function edit(id){
		ua.edit(id).
			then(handleEditSuccess).
			catch(handleError);
	}

	function handleEditSuccess(){
		showModal('#newUserModal');
	}

	function handleDeleteSuccess(){
		toastr.success('Usuario eliminado.', 'Atención');
	}

	function handleError(err){
		console.error(err);
		toastr.error(err.reason, err.error);
	}
}

function link (scope, element, attr){

	scope.$on('$destroy', function(){
		scope.vm.unsubscribe();
	})

}