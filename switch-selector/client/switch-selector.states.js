angular.module("conapps").config(['$stateProvider',
  function($stateProvider){
    $stateProvider
      .state('switch_selector', {
        url         : '/switch_selector',
        template    : '<switch-selector></switch-selector>',
      });
    }
  ]);