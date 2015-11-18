angular.module('conapps').service('usersAdminService', usersAdminService);

usersAdminService.$inject = ['$meteor', '$q', 'safeApply'];

function usersAdminService($meteor, $q, safeApply){

	var service = {

		subscribe(){
			return $meteor.subscribe('users').
				then(service.handleSubscribeSuccess).
				catch(service.handleError);
		},

		handleSubscribeSuccess(subscription) {
			service.subscription = subscription;
			console.log('Subscribed to "users".');
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
      service.computation  = null;
			console.log('Unsubscribed from "users".');
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
						service.setDefault(); 
						return res;
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
			safeApply.onAngular(() => angular.copy(user, service.activeUser));
		},

		orderBy(field){
			var sort = service.sort.get();
			var value = (!!sort[field]) ? sort[field] * -1 : 1;

			sort = {};

			sort[field] = value;

			service.sort.set(sort);
		},

		//////

		users: [],

		usersCursor: {},

		activeUser: defaultUser(),

		sort: new ReactiveVar({}),

		handleError: handleError

	};

	function saveUser(method){
		return $meteor.call(method, service.activeUser).
			catch(handleError)
	}

	function defaultUser() {
		return {
			profile: { roles: [] }
		};
	}

	function _updateUsers(){
		service.computation = safeApply.onAutorun(updateUsers);
	}

  function updateUsers(){
  	var options = {
  		sort: service.sort.get()
  	};

    angular.copy(
    	Meteor.users.find({}, options).fetch(),
  	  service.users
  	);
  }

	function updateRoles(){
		return $meteor.call(
			'users-admin:update-roles'
			, service.activeUser._id
			, service.activeUser.profile.roles
		).
		catch(service.handleError);
	}

	function handleError(err){
		var rejected = $q.defer().reject();

		console.error(err);
		toastr.error(err.reason, err.error);

		return rejected;
	}

	//////////

	return service;
}