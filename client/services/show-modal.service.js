angular.module('conapps').service('showModal', ['$q', function($q){
	return function(modalId, beforeModal, context){
		
		var deferred = $q.defer();
		var domNode  = $(modalId);
		
		context || (context = this);
		
		if (!domNode instanceof jQuery)
			throw new Meteor.Error('dom-node-not-founc');
		
		if (angular.isFunction(beforeModal))
			beforeModal.call(context);
		
		domNode.
			modal('toggle').
			on('shown.bs.modal', function(){
				deferred.resolve();
			});

		return deferred.promise;
	}
}]);