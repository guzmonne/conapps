angular.module('conapps').directive('estimatesEditModifiers', estimatesEditModifiers);

function estimatesEditModifiers(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/estimates-edit/views/estimates-edit-modifiers.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {},
	}
}

controller.$inject = ['estimateEditService'];

function controller(es, em){
	var vm = this;

	vm.estimate             = es.estimate;
	vm.updateModifiers      = es.updateModifiers;
	vm.estimate             = es.estimate;
	vm.toggleDeal           = es.toggleDeal;
	vm.toggleCustomDiscount = es.toggleCustomDiscount;
	vm.toggleServiceLvl     = es.toggleServiceLvl;
}

function link (scope, element, attr){}