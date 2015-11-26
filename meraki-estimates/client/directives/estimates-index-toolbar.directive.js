angular.module('conapps').directive('estimatesIndexToolbar', function(){
	return {
		restrict    : 'E',
		replace     : true,
		templateUrl : 'meraki-estimates/client/views/estimates-index-toolbar.template.ng.html',
		scope: {
			options: '=',
		},
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
    link: link
	};
});

controller.$inject = ['showModal', 'estimatesIndexService'];

function controller(showModal, ei){
	var vm = this;

	vm.newEstimate = newEstimate;
  vm.stringSearch = '';
  vm._stringSearch = ei.stringSearch;

	///////

	function newEstimate(){
		vm.estimate = {};
		showModal('#newEstimateModal');
	}
}

function link(scope){
  scope.$watch('vm.stringSearch', s => scope.vm._stringSearch.set(s));
}
