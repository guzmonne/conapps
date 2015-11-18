angular.module('conapps').directive('estimatesIndexTable', estimatesIndexTable);

estimatesIndexTable.$inject = ['estimatesIndexService', 'tableLink'];

function estimatesIndexTable(ei, tl){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-index-table.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
		link             : tl(ei)
	}
}

controller.$inject = ['estimatesIndexService'];

function controller(ei){
	var vm = this;

	vm.collection = ei.estimates;

  activate();

	//////////

  function activate(){
    ei.getEstimates();
  }
}