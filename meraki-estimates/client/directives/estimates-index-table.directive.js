angular.module('conapps').directive('estimatesIndexTable', estimatesIndexTable);

function estimatesIndexTable(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-index-table.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
    link             : link,
		scope            : {
			options    : '='
			//collection : '='
		}
	}
}

controller.$inject = ['estimatesIndexService'];

function controller(ei){
	var vm = this;

	vm.collection = ei.estimates;
	vm.chevronIfSorting = chevronIfSorting;
	vm.sortBy = sortBy;
  vm.unsubscribe = ei.unsubscribe;
  vm.sortBy = ei.sortBy;
  vm.sort   = ei.sort;

  activate();

	//////////

  function activate(){
    ei.getEstimates();
  }

	function chevronIfSorting(field){
		if (vm.options && vm.options.sort === field)
			return (vm.options.reverse) ? 'fa fa-chevron-down' : 'fa fa-chevron-up';
		else
			return '';
	}

	function sortBy(field){
		var previousSort = vm.options.sort;

		check(field, String);

		if (!previousSort || previousSort !== field){
			vm.options.sort = field;
			vm.options.reverse = false;
		} else {
			vm.options.reverse = !vm.options.reverse;
		}
	}

}

function link(scope, element){
  var chevronDown = '<i class="fa fa-chevron-down pull-right"></i>';
  var chevronUp   = '<i class="fa fa-chevron-up pull-right"></i>';

  var th = element.find('th');

  th.on('click', (e) => {
    var header = angular.element(e.currentTarget);
    var field = header.data('sortBy');
    var sort;

    scope.vm.sortBy(field);

    removeChevrons();

    sort = scope.vm.sort.get();

    if (sort[field] === 1)
      header.append(chevronUp);

    if (sort[field] === -1)
      header.append(chevronDown);

    console.log(sort);
  });

  scope.$on('$destroy', () => {
    scope.vm.unsubscribe();
    th.off('click');
  });

  ///////

  function removeChevrons(){
    element.find('[data-sort-by] > i').remove();
  }
}