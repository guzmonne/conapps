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

controller.$inject = ['usersAdminService'];

function controller(ua){
	var vm = this;

	vm.unsubscribe = ua.unsubscribe;
	vm.users = ua.users;
	vm.delete = deleteUser;

	activate();

	////////
	
	function activate(){
		ua.getUsers();
	}

	function deleteUser(id){
		ua.delete(id).
			then(handleDeleteSuccess).
			catch(handleDeleteError)
	}

	function handleDeleteSuccess(){
		toastr.success('Usuario eliminado.', 'Atención');
	}

	function handleDeleteError(err){
		console.error(err);
		toastr.error(err.reason, err.error);
	}
}

function link (scope, element, attr){

	scope.$on('$destroy', function(){
		scope.vm.unsubscribe();
	})

}