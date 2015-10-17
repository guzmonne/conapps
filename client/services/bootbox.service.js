angular.module('conapps').service('bootboxService', bootboxService);

bootboxService.$inject = ['$q'];

function bootboxService($q){
	
	var bs = {};

	bs.confirmProductDeletion = function(){
		var deferred = $q.defer();

		var content = {
			message: '¿Esta seguro que desea eliminar este producto?',
			title: 'Eliminar Producto',
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

	bs.confirmProductRemove = function(){
		var deferred = $q.defer();

		var content = {
			message: '¿Esta seguro que desea eliminar este producto?',
			title: 'Eliminar Producto',
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
					callback: function(){
						deferred.reject();
					}
				}
			}
		};

		bootbox.dialog(content);

		return deferred.promise;
	}


	////////////

	return bs;
}