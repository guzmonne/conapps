angular.module('conapps').service('bootboxService', bootboxService);

bootboxService.$inject = ['$q'];

function bootboxService($q){
	
	var service = {};

	service.confirmProductDeletion = function(){
		return service.confirmXDeletion('producto');
	}

	service.confirmUserDeletion = function(){
		return service.confirmXDeletion('usuario');
	}

	service.confirmXDeletion = function(x){
		check(x, String);

		x = x.toLowerCase();

		var X = x.charAt(0).toUpperCase() + x.slice(1);

		var deferred = $q.defer();

		var content = {
			message: '¿Esta seguro que desea eliminar este ' + x + '?',
			title: 'Eliminar ' + X,
			buttons: {
				confirm: {
					label: 'Aceptar',
					className: 'btn-primary',
					callback: function() {
						deferred.resolve();
					}
				},
				cancel: {
					label: 'Cancelar',
					className: 'btn-default',
				}
			},
			onEscape: function(){
				deferred.reject();
			}
		};

		bootbox.dialog(content);

		return deferred.promise;
	}

	////////////

	return service;
}