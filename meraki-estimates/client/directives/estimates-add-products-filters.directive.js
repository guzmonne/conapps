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
		},
		link: link
	}
}

controller.$inject = ['estimateEditService'];

function controller(es){
	var vm = this;
	
	vm.currentLine    = '';
	vm.filterBy       = filterBy;
	vm.toggleSelected = toggleSelected;
	vm.selProdLen     = es.selectedProductsLength;

	///////////
	
	function filterBy(line){
		if (!line) return;

		if (vm.currentLine === 'Selected')
			toggleSelected();

		if (line === vm.currentLine){
			vm.line        = '';
			vm.currentLine = '';
		} else {
			vm.line        = line;
			vm.currentLine = line;
		}
	}

	function toggleSelected(){
		toggleCurrentLine();
		toggleShowSelected();
	}

	function toggleCurrentLine(){
		if (vm.currentLine === 'Selected'){
			vm.currentLine = '';
			vm.line        = '';
		} else {
			vm.currentLine = 'Selected';
		}
	}

	function toggleShowSelected(){
		vm.showSelected = (vm.currentLine === 'Selected');
	}
}

function link(scope, element){
	scope.$watch('vm.currentLine', function(line){
		element.find('.btn').removeClass('active');
		if (!angular.isString(line) || line === '') return;
		element.find('[name=' + line.replace(' ', '_') + ']').addClass('active');
	});
}