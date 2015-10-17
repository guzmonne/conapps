angular.module('conapps').directive('estimatesAddProductsFilters', estimatesAddProductsFilters);

function estimatesAddProductsFilters(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-add-products-filters.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			line: '=',
			showSelected: '='
		},
		link: link
	}
}

controller.$inject = [];

function controller(){
	var vm = this;

	vm.currentLine = '';
	vm.filterBy    = filterBy

	///////////
	
	function filterBy(line){
		if (!line) return;
		if (line === 'selected')
			vm.showSelected = true;
		else
			vm.showSelected = false;
		if (line === vm.currentLine){
			vm.line = '';
			vm.currentLine = '';
		} else {
			vm.line = line;
			vm.currentLine = line;
		}
	}
}

function link(scope, element){
	scope.$watch('vm.currentLine', function(line){
		element.find('.btn').removeClass('active');
		if (!angular.isString(line) || line === '') return;
		element.find('[name=' + line.replace(' ', '_') + ']').addClass('active');
	});
}