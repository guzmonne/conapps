angular.module('conapps').directive('usersAdminTable', usersAdminTable);

usersAdminTable.$inject = ['usersAdminService', 'tableLink'];

function usersAdminTable(ua, tl){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'users-admin/client/views/users-admin-table.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
		link             : tl(ua)
	}
}

controller.$inject = ['usersAdminService', 'bootboxService', 'showModal'];

function controller(ua, bs, showModal){
	var vm = this;

	vm.users = ua.collection;
	
	vm.delete = deleteUser;
	vm.edit = edit;

	activate();

	////////
	
	function activate(){
		ua.getCollection();
	}

	function callDeleteMethod(id){
		ua.delete(id).
			then(handleDeleteSuccess).
			catch(ua.handleError)
	}

	function deleteUser(id){
		bs.confirmUserDeletion().
			then(() => callDeleteMethod(id)).
			catch(ua.handleError);
	}

	function handleDeleteSuccess(){
		toastr.success('Usuario eliminado.', 'Atención');
	}

	function edit(id){
		ua.edit(id).
			then(handleEditSuccess).
			catch(ua.handleError);
	}

	function handleEditSuccess(){
		showModal('#newUserModal');
	}

}