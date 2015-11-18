angular.module('conapps').factory('safeApply', safeApply);

safeApply.$inject = ['$rootScope', 'safeApplyAutorun'];

function safeApply($rootScope, safeApplyAutorun){
	const factory = {
		onAngular: $rootScope.safeApply.bind($rootScope),
		onAutorun: safeApplyAutorun
	};

	///////

	return factory;
}