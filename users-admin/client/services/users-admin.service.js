angular.module('conapps').service('usersAdminService', usersAdminService);

usersAdminService.$inject = ['$meteor', '$q', '$rootScope', '$timeout'];

function usersAdminService($meteor, $q, $rootScope, $timeout){
	
	var service = {

		users: [],

		usersCursor: {},

		subscribe(){
			return $meteor.subscribe('users').
				then(service.handleSubscribeSuccess).
				catch(service.handleError);
		},

		handleSubscribeSuccess(subscription) {
			service.subscription = subscription;
			console.log('Subscription to "users" ready.');
		},

		handleError(err){
			var rejected = $q.defer().reject();

			console.error(err);
			toastr.error(err.reason, err.error);

			return rejected;
		},

		getUsers(){
			if (!service.subscription)
				service.subscribe().
					then(service.handleGetUsersSuccess).
					catch(service.handleError);
			else
				_updateUsers();
		},

		handleGetUsersSuccess(){
			_updateUsers();
		},

		unsubscribe(){
			if (service.subscription && service.subscription.stop)
				service.subscription.stop();
			if (service.computation && service.computation.stop)
				service.computation.stop();
			service.subscription = null;
			console.log('Unsubscribe from "Users".');
		}

	};

	function _updateUsers(){
		Tracker.autorun((computation) => {
			service.computation = computation;
			angular.copy(Meteor.users.find({}).fetch(), service.users);
			//service.users = Meteor.users.find({}).fetch();
			$timeout(() => $rootScope.$apply());
			console.log('Reruned computation');
		});
	}

	//////////

	return service;
}