angular.module('conapps').directive('switchSelector', switchSelector);

function switchSelector(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'switch-selector/client/views/switch-selector-index.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
		link             : link
	}
}

controller.$inject = ['$scope', '$meteor', 'switchSelectorService', 'BreadcrumbsService', 'guxCollapse'];

function controller($scope, $meteor, sss, breadcrumbs, collapse){
	var vm = this;

	vm.switches     = sss.switches;
	vm.resetFilters = sss.resetFilters;
	vm.unsubscribe  = sss.stop;
	
	vm.showModal    = showModal;

	vm.isAdmin      = App.auth.isAdmin;
	
	activate();

	/////////////
	
	function activate(){
		// Meteor Service Subscription
		sss.subscribe();
		// Set breadcrumbs links
		breadcrumbs.links = [
				{name: 'Home', address: '/'},
				{name: 'Switch Selector', address: '/switch_selector'},
				{name: 'Index'}
		];
	}

	function showModal(editableSwitch){
		//vm.activeSwitch = (editableSwitch) ? _.clone(editableSwitch) : {};
		if (editableSwitch)
			sss.activateSwitch(editableSwitch);
		else
			sss.defaultSwitch();
		$('#addNewSwitchModal').modal('toggle');
	}

}

function link(scope){

	scope.$on('$destroy', function(){
		scope.vm.unsubscribe();
	});

}