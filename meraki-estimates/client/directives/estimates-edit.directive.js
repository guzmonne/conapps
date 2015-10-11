angular.module('conapps').directive('estimatesEdit', [estimatesEditDirective]);

function estimatesEditDirective(something){
	return {
		restrict: 'E',
		replace : true,
		templateUrl: 'meraki-estimates/client/views/estimates-edit.template.ng.html',
		scope: {

		},
		controller: ['$meteor', '$stateParams', controller],
		controllerAs: 'vm',
		bindToController: true,
		link: link
	};
}

function controller($meteor, $stateParams){
	var vm        = this;
	vm.estimate   = null;
	vm.estimateId = $stateParams.id;

	activate();

	//////////
	
	function activate(){
		$meteor.call('getEstimate', vm.estimateId)
		.then(function(estimate){
			vm.estimate = estimate;
		})
		.catch(function(err){
			toastr.error(err.error);
			console.log(err);
		});
	}
}

function link(scope, element){
	element.find('#spinner').append(App.spinner.el);
}