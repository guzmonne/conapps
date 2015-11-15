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
	};
});

controller.$inject = ['updateFiltersService', 'showModal'];

function controller(updateFiltersService, showModal){
	var vm = this;

	this.stringSearch  = '';
	this.updateFilters = updateFiltersService.bind(this);
	this.newEstimate   = newEstimate;
	
	function newEstimate(){
		vm.estimate = {};
		showModal('#newEstimateModal');
	}
}
