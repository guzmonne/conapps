angular.module('conapps').directive('newEstimateModal', newEstimateModal);

function newEstimateModal(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/new-estimate-modal.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {
			estimate: '='
		},
	}
}

controller.$inject = ['$meteor', '$state', 'closeModal'];

function controller($meteor, $state, closeModal){
	this.createEstimate = createEstimate;

	///////////
	
	function createEstimate(){
		$meteor.call('estimate:create', this.estimate)
			.then(function(estimateId){
				toastr.success('Estimate creado.', 'Ok!')
				closeModal('#newEstimateModal')
					.then(function(){
						$state.go('meraki_estimates.edit', {id: estimateId});
					});
			})
			.catch(function(err){
				toastr.error(err.reason, 'Error!');
				console.log(err);
			});
	}
}

function link (scope, element, attr){}