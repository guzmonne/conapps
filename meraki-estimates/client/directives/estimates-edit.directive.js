angular.module('conapps').directive('estimatesEdit', [estimatesEditDirective]);

function estimatesEditDirective(){
	return {
		restrict: 'E',
		replace : true,
		templateUrl: 'meraki-estimates/client/views/estimates-edit.template.ng.html',
		scope: {

		},
		controller: controller,
		controllerAs: 'vm',
		bindToController: true,
		link: link
	};
}

controller.$inject = ['$stateParams', 'estimateModifiers', 'estimateEditService'];

function controller($stateParams, estimateModifiers, es){
	var vm        = this;
	
	vm.estimate   = null;
	vm.estimateId = $stateParams.id;
	vm.onReady    = true;

	activate();

	//////////
	
	function activate(){
		getEstimate();
	}
	
	function getEstimate(){
		vm.estimate = es.getEstimate(vm.estimateId)
			.then(function(){
				vm.estimate  = es.estimate;
				vm.modifiers = vm.estimate.modifiers || estimateModifiers.defaults();
			});
	}	
}

function link(scope, element){
	element.find('#spinner').append(App.spinner.el);

	scope.$watch('vm.onReady', n => console.log(n), true);
}