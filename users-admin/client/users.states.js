angular.module("conapps").config(['$stateProvider',
  function($stateProvider){
    $stateProvider
      .state('users_admin', {
        url         : '/users_admin',
        template    : '<users-admin></users-admin>',
      });
    }
  ]);