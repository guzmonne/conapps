angular.module('conapps').service('estimateEditService', estimateEditService);

estimateEditService.$inject = ['$meteor', '$state', '$q'];

function estimateEditService($meteor, $state, $q){
	
	var service = {

		getEstimate: function(id){
			return $meteor.call('getEstimate', id)
				.catch(function(err){
					var deferred = $q.defer();
					toastr.error(err.reason);
					$state.go('meraki_estimates.index');
					console.log(err);
					return $q.reject();
				});
		},

		saveEstimateProducts: function(estimateId, products){
			return $meteor.call('saveEstimateProducts', products)
				.catch(function(err){
					var deferred = $q.defer();
					toastr.error(err.reason, err.error);
					console.log(err);
					return $q.reject();
				});
		},

	};

	//////////////

	return service;
}