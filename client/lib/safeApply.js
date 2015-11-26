angular.module('conapps').run(safeApply);

safeApply.$inject = ['$rootScope'];

function safeApply($rootScope){

  $rootScope.safeApply = function(fn){
    var phase = this.$root.$$phase;

    if (phase == '$apply' || phase == '$digest'){
      if (fn  && ( typeof(fn) == 'function' )){
        fn();
      }
    } else {
      this.$apply(fn);
    }
  }

}