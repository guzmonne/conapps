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
			line           : '=',
			showSelected   : '=',
			selectedLength : '='
		},
		link: link
	}
}

controller.$inject = [];

function controller(){
	var vm = this;
	
	vm.currentLine    = '';
	vm.filterBy       = filterBy;
	vm.toggleSelected = toggleSelected;

	///////////
	
	function filterBy(line){
		if (!line) return;

		if (line === vm.currentLine){
			vm.line        = '';
			vm.currentLine = '';
		} else {
			vm.line        = line;
			vm.currentLine = line;
		}
	}

	function toggleSelected(){
		if (vm.currentLine === 'Selected'){
			vm.showSelected = false;
			vm.currentLine  = '';
			console.log(vm.showSelected);
			return;
		}
		vm.currentLine  = 'Selected';
		vm.showSelected = true;
		console.log(vm.showSelected);
	}
}

function link(scope, element){
	scope.$watch('vm.currentLine', function(line){
		element.find('.btn').removeClass('active');
		if (!angular.isString(line) || line === '') return;
		element.find('[name=' + line.replace(' ', '_') + ']').addClass('active');
	});
}