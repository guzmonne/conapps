angular.module('conapps').service('callSaveMethod', [
	'$meteor', '$q',
	function($meteor, $q){
		return function(model, config){
			var method, msg;
			if (!model || !config) throw new Meteor.Error('arguments-missing');
			if (!config.updateMethod || !config.createMethod) throw new Meteor.Error('methods-missing');
			if (model._id) {
				method = config.updateMethod;
				msg    = (config.updateMessage) ? config.updateMessage : 'Acción Finalizada';
			} else {
				method = config.createMethod;
				msg    = (config.createMessage) ? config.createMessage : 'Acción Finalizada'; 
			}
			var promise = $meteor.call(method, model)
				.then(function(result){
					toastr.success(msg, 'Exito!');
				})
				.catch(function(err){
					var deferred = $q.defer();
					toastr.error('Se ha producido un error inesperado', 'Error!');
					console.log(err);
					deferred.reject(err);
					return deferred.promise;
				});
			return promise;
		}
	}
]);