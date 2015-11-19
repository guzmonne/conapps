angular.module('conapps').service('usersAdminService', usersAdminService);

usersAdminService.$inject = ['$meteor', '$q', 'safeApply', 'collectionManagerGenerator'];

function usersAdminService($meteor, $q, safeApply, cmg){
	let service = new cmg({
		sort: {name: 1},
		publication: 'users',
		mongoCollection: Meteor.users
	});

	angular.extend(service, {

		setDefault(){
			angular.copy(defaultUser(), this.activeUser);
		},

		save(){
			var self = this;

			if (self.activeUser._id)
				return updateRoles();
			else
				return saveUser('users-admin:create').
					then(res => {
						self.setDefault();
						return res;
					});
		},

		delete(id){
			check(id, String);

			return $meteor.call('users-admin:delete', id);
		},

		edit(id){
			check (id, String);

			let self = this;

			let deferred = $q.defer();
			let user = Meteor.users.findOne(id);

			if (!user)
				deferred.reject(new Meteor.Error('ID de usuario invalida', 'Error'));
			else {
				self.setUser(user);
				deferred.resolve();
			}

			return deferred.promise;
		},

		setUser(user){
			let self = this;

			safeApply.onAngular(() => angular.copy(user, self.activeUser));
		},

		//////////
		
		activeUser: defaultUser()

	});
	

	function saveUser(method){
		return $meteor.call(method, service.activeUser).
			catch(handleError)
	}

	function defaultUser() {
		return {
			profile: { roles: [] }
		};
	}

	function updateRoles(){
		return $meteor.call(
			'users-admin:update-roles'
			, service.activeUser._id
			, service.activeUser.profile.roles
		).
		catch(service.handleError);
	}

	//////////

	return service;
}