angular.module('conapps').service('tableLink', tableLink);

tableLink.$inject = ['tableHelpers'];

function tableLink(th){
	const errMsgs = {
		invalidService: {
			reason: 'service is undefined or is not valid',
			title : 'Invalid or Empty Service'
		},

		eIsNotAnObject: {
			reason: 'e is not an event object',
			title : 'Not an event'
		}
	}

	function throwMeteorError(errMsg){
		throw new Meteor.Error(errMsg.reason, errMsg.title);
	}

	return function(service /* Angular Service */){
		if (	 !service 
				|| !service.sort
				|| !angular.isFunction(service.unsubscribe) )
			throwMeteorError(errMsgs.invalidService);

		return function(scope, element){
			let headers = element.find('th[data-sort-by]');

			headers.addClass('th-pointer unselectable');

			check(headers, angular.element);

			headers.on('click', (e) => {
				if (!e || !e.currentTarget) throwMeteorError(errMsgs.eIsNotAnObject);

				th.removeChevrons(element.find('thead'));
				th.sortByField(angular.element(e.currentTarget), service.sort);
			});

			scope.$on('$destroy', () => {
				service.unsubscribe();
				headers.off();
			})
		}

	}
}