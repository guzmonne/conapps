angular.module('conapps').directive('estimatesEdit', [estimatesEditDirective]);

function estimatesEditDirective(something){
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

controller.$inject = ['$meteor', '$stateParams', '$state', 'estimateModifiers'];

function controller($meteor, $stateParams, $state, estimateModifiers){
	var vm        = this;
	
	vm.estimate   = null;
	vm.estimateId = $stateParams.id;
	
	activate();

	//////////
	
	function activate(){
		$meteor.call('getEstimate', vm.estimateId)
		.then(function(estimate){
			vm.estimate  = estimate;
			vm.modifiers = vm.estimate.modifiers || estimateModifiers.defaults();
		})
		.catch(function(err){
			toastr.error(err.reason);
			$state.go('meraki_estimates.index');
			console.log(err);
		});
	}
}

function link(scope, element){
	element.find('#spinner').append(App.spinner.el);
}