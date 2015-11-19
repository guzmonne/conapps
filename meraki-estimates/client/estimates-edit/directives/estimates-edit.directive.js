angular.module('conapps').directive('estimatesEdit', [estimatesEditDirective]);

function estimatesEditDirective(){
	return {
		restrict: 'E',
		replace : true,
		templateUrl: 'meraki-estimates/client/estimates-edit/views/estimates-edit.template.ng.html',
		scope: {

		},
		controller: controller,
		controllerAs: 'vm',
		bindToController: true,
		link: link
	};
}

controller.$inject = ['$stateParams', 'estimateEditService'];

function controller($stateParams, es){
	var vm        = this;
	
	vm.estimate   = null;
	vm.estimateId = $stateParams.id;

	activate();

	//////////
	
	function activate(){
		getEstimate();
	}
	
	function getEstimate(){
		vm.estimate = es.getEstimate(vm.estimateId)
			.then(function(){
				vm.estimate  = es.estimate;
			});
	}	
}

function link(scope, element){
	element.find('#spinner').append(App.spinner.el);
}