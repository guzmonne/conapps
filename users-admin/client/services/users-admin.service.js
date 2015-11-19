angular.module('conapps').service('usersAdminService', usersAdminService);

usersAdminService.$inject = ['$meteor', '$q', 'safeApply', 'collectionManagerGenerator'];

function usersAdminService($meteor, $q, safeApply, cmg){
	let service = new cmg({
		sort: {name: 1},
		publication: 'users',
		mongoCollection: Meteor.users,
		deleteMethod: 'users-admin:delete'
	});

	angular.extend(service, {

		setDefault(){
			angular.copy(defaultUser(), this.model);
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

		///////

		model: defaultUser()

	});
	

	function saveUser(method){
		return $meteor.call(method, service.model).
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
			, service.model._id
			, service.model.profile.roles
		).
		catch(service.handleError);
	}

	//////////

	return service;
}