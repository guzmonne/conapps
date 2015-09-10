angular.module("switch-selector").config(['$stateProvider',
  function($stateProvider){
    $stateProvider
      .state('switch_selector', {
        url         : '/switch_selector',
        templateUrl : 'switch-selector/client/views/switch-selector-index.template.ng.html',
        controller  : 'SwitchSelectorIndexCtrl',
        controllerAs: 'index',
      });
    }
  ]);