angular.module('conapps').factory('callSaveMethod', [
	'$meteor', '$q',
	function($meteor, $q){
		
		function callSave(model, config){
			var method, msg;

			checkArguments(model, config);
			checkMethods(model, config);

			if (model._id) {
				method = config.updateMethod;
				msg    = (config.updateMessage) ? config.updateMessage : 'Acción Finalizada';
			} else {
				method = config.createMethod;
				msg    = (config.createMessage) ? config.createMessage : 'Acción Finalizada'; 
			}

			return callMeteorMethod(model, method, msg);
		}

		function checkArguments(model, config){
			if (!model || !config) throw new Meteor.Error('arguments-missing');
		}

		function checkMethods(model, config){
			if (!config.updateMethod || !config.createMethod) throw new Meteor.Error('methods-missing');
		}

		function callMeteorMethod(model, method, msg){
			var promise = $meteor.call(method, model)

			promise.then(handleSuccess.bind({msg: msg}))
			promise.catch(handleError);

			return promise;
		}

		function handleSuccess(result){
			toastr.success(this.msg, 'Exito');
			return result;
		}

		function handleError(err){
			var deferred = $q.defer();

			toastr.error('Se ha producido un error inesperado.', 'Error!');

			console.log(err);

			deferred.reject(err);

			return deferred.promise;
		}

		////////////
		
		return callSave;
	}
]);