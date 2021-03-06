angular.module('conapps').directive('selectedProductBadge', selectedProductBadge);

function selectedProductBadge(){
	return {
		restrict         : 'A',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {},
	}
}

controller.$inject = ['estimateEditService'];

function controller(es){
	var vm = this;

	vm.selectedProductsObs    = es.selectedProductsObs;
	vm.selectedProductsLength = es.selectedProductsLength;
}

function link (scope, element){
	var vm = scope.vm;
	var obs; 

	element.addClass('badge');

	obs = vm.selectedProductsObs.subscribe(function(){
		var len = vm.selectedProductsLength();

		element.removeClass();

		if (len === 0)
			element.addClass('badge');
		if (len > 0)
			element.addClass('badge badge-primary animated tada');

		setTimeout(function() {
			element.removeClass('animated tada');
		}, 600);
	});

	scope.$on('$destroy', () => obs.dispose());
}