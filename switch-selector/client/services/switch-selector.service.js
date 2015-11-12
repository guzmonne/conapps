angular.module('conapps').service('switchSelectorService', switchSelectorService);

switchSelectorService.$inject = ['$meteor', '$q', 'rx'];

function switchSelectorService($meteor, $q, rx){

	const service = {

		brandOptions: ['CISCO', 'HP', 'JUNIPER'],

		portOptions: [8, 12, 16, 24, 48],

		portSpeedOptions: ['100 Mbps', '1 Gbps', '10 Gbps'],

		activeSwitch: {},

		filters: {},

		switches: [],

		subscribe: subscribe,

		refresh: refresh,

		subscription: null,

		stop: stop,

		deleteFilter: deleteFilter,

		resetFilters: resetFilters,

		activateSwitch: activateSwitch,

		saveActiveSwitch: saveActiveSwitch,

		defaultSwitch: defaultSwitch,

	}

	//////////
	
	function subscribe(){
		if (service.subscription)
			service.subscription.stop();
		return $meteor.
			subscribe('switches', service.filters).
			then(handleSuccess).
			catch(handleError);
	}

	function handleSuccess(subscription){
		service.subscription = subscription;

		console.log('Subscription to switches ready.');
		refresh();

		return subscription;
	}

	function refresh(){
		angular.copy($meteor.collection(getSwitches), service.switches);
	}

	function getSwitches(){
		return Switches.find(service.filters);
	}

	function handleError(err){
		var deferred = $q.defer();

		console.log(err);
		toastr.error(err.reason, err.error);

		deferred.reject();

		return deferred.promise;
	}

	function stop(){
		if (angular.isFunction(service.stop))
			service.subscription.stop();
	}

	function deleteFilter(name){
		delete service.filters[name];
	}

	function activateSwitch(editableSwitch){
		if (angular.isObject(editableSwitch)){
			angular.copy(editableSwitch, service.activeSwitch);
		}
	}

	function resetFilters(){
		angular.copy({}, service.filters);
	}

	function saveActiveSwitch(e){
		if (e && angular.isFunction(e.preventDefault))
			e.preventDefault();

		if (service.activeSwitch._id)
			saveSwitch('updateSwitch', 'Switch Actualizado.');
		else
			saveSwitch('addSwitch', 'Switch Creado');
	}

	function saveSwitch(method, msg){
		return $meteor.call(method, service.activeSwitch).
			then(function(){
				toastr.success(msg, '¡Ok!');
				if (!service.activeSwitch._id){
					refresh();
					defaultSwitch();
				} else {
					mergeActiveSwitch();
				}
			}).
			catch(handleError)
	}

	function defaultSwitch(){
		angular.copy({}, service.activeSwitch);
	}

	function mergeActiveSwitch(){
		var outdatedSwitch = _.find(service.switches, s => s._id === service.activeSwitch._id);
		angular.copy(service.activeSwitch, outdatedSwitch);
	}

	//////////

	return service;
}