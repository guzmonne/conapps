angular.module("conapps").config(['$stateProvider',
  function($stateProvider){
    $stateProvider
      .state('meraki_clients', {
        url         : '/meraki_clients',
        templateUrl : 'meraki-clients/client/views/meraki-clients-index.template.ng.html',
        controller  : 'MerakiClientsIndexCtrl',
        controllerAs: 'index',
        resolve     : {
          "currentUser": ['$meteor', function($meteor){
            return $meteor.requireUser();
          }]
        }
      });
    }
  ]);