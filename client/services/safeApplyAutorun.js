angular.module('conapps').factory('safeApplyAutorun', safeApplyAutorun);

safeApplyAutorun.$inject = ['$rootScope'];

function safeApplyAutorun($rootScope){
  return function(fn){
    return Tracker.autorun(() => $rootScope.safeApply(fn));
  }
}