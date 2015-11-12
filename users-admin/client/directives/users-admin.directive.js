angular.module('conapps').directive('usersAdmin', usersAdmin);

function usersAdmin(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'users-admin/client/views/users-admin.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {}
	};
}

controller.$inject = ['BreadcrumbsService'];

function controller(breadcrumbs){
	var vm = this;

  activate();

  ///////////

  function activate(){
    breadcrumbs.links = [
        {name: 'Home', address: '/'},
        {name: 'Users', address: '/users_admin'},
        {name: 'Index'}
    ];
  }
}