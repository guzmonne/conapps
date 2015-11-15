angular.module("conapps").config(['$stateProvider',
  function($stateProvider){
    $stateProvider
      .state('login', {
        url         : '/login',
        templateUrl : 'client/views/login.template.ng.html',
        controller  : 'LoginCtrl',
        controllerAs: 'login',
      });
    }
  ]);