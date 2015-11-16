angular.module('conapps').service('usersAdminService', usersAdminService);

usersAdminService.$inject = ['$meteor', '$q', '$rootScope', '$timeout'];

function usersAdminService($meteor, $q, $rootScope, $timeout){

	var service = {

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
		},

		setDefault(){
			angular.copy(defaultUser(), service.activeUser);
		},

		save(){
			if (service.activeUser._id)
				return updateRoles();
			else
				return saveUser('users-admin:create').
					then(res => {
						service.setDefault(); return res;
					});
		},

		delete(id){
			check(id, String);

			var deferred = $q.defer();

			Meteor.call('users-admin:delete', id, (err, res) => {
				if (err) return deferred.reject(err);
				deferred.resolve(res);
			});

			return deferred.promise;
		},

		edit(id){
			check(id, String);

			var deferred = $q.defer();
      var user     = Meteor.users.findOne(id);

      if (!user)
        deferred.reject(new Meteor.Error('ID de usuario invalida', 'Error'));
      else {
        service.setUser(user);
        deferred.resolve();
      }

			return deferred.promise;
		},

		setUser(user){
			angular.copy(user, service.activeUser);
			$timeout(() => $rootScope.$apply());
		},

		//////

		users: [],

		usersCursor: {},

		activeUser: defaultUser()

	};

	function saveUser(method){
		var deferred = $q.defer();

		Meteor.call(method, service.activeUser, (err, result) => {
			if (err) return deferred.reject(err);
			deferred.resolve(result);
		});

		return deferred.promise;
	}

	function defaultUser() {
		return {
			profile: { roles: [] }
		};
	}

	function _updateUsers(){
		Tracker.autorun((computation) => {
			service.computation = computation;
			service.cursor = Meteor.users.find({}); 
			angular.copy(Meteor.users.find({}).fetch(), service.users);;
			$timeout(() => $rootScope.$apply());
		});
	}

	function updateRoles(){
		return $meteor.call('users-admin:update-roles'
			, service.activeUser._id
			, service.activeUser.profile.roles
		).
		catch(service.handleError);
	}

	//////////

	return service;
}