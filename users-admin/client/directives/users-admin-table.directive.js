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

controller.$inject = ['usersAdminService', 'bootboxService', 'showModal'];

function controller(ua, bs, showModal){
	var vm = this;

	vm.unsubscribe = ua.unsubscribe;
	vm.users = ua.users;
	vm.delete = deleteUser;
	vm.edit = edit;
	vm.sort = ua.sort;
	vm.orderBy = ua.orderBy;

	activate();

	////////
	
	function activate(){
		ua.getUsers();
	}

	function callDeleteMethod(id){
		ua.delete(id).
			then(handleDeleteSuccess).
			catch(handleError)
	}

	function deleteUser(id){
		bs.confirmUserDeletion().
			then(() => callDeleteMethod(id)).
			catch(handleError);
	}

	function handleDeleteSuccess(){
		toastr.success('Usuario eliminado.', 'Atención');
	}

	function edit(id){
		ua.edit(id).
			then(handleEditSuccess).
			catch(handleError);
	}

	function handleEditSuccess(){
		showModal('#newUserModal');
	}

	function handleError(err){
		console.error(err);
		toastr.error(err.reason, err.error);
	}

}

function link (scope, element, attr){

	var chevronDown = '<i class="fa fa-chevron-down pull-right"></i>';
	var chevronUp   = '<i class="fa fa-chevron-up pull-right"></i>';

	scope.vm.callOrderBy = callOrderBy;

	scope.$on('$destroy', function(){
		scope.vm.unsubscribe();
	});

	function callOrderBy(e){
		var field = e.currentTarget.dataset.orderBy;
		var header = e.currentTarget;

		scope.vm.orderBy(field);

		removeChevrons();

		if (scope.vm.sort.get()[field] === 1)
			angular.element(header).append(chevronUp);
		if (scope.vm.sort.get()[field] === -1)
			angular.element(header).append(chevronDown);
	}

	function removeChevrons(){
		element.find('[data-order-by] > i').remove();
	}

}