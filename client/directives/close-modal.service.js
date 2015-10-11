angular.module('conapps').service('closeModal', closeModal);

closeModal.$inject = ['$q'];

function closeModal($q){
	return function(modalId, beforeModal, context){
		var deferred = $q.defer();
		var domNode  = $(modalId);
		if (!domNode instanceof jQuery)
			throw new Meteor.Error('dom-node-not-founc');
		if (angular.isFunction(beforeModal))
			beforeModal.call(context);
		domNode
		.modal('toggle')
		.on('hidden.bs.modal', function(){
			deferred.resolve();
		});
		return deferred.promise;
	}
}