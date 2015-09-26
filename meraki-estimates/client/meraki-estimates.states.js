angular.module("conapps").config(['$stateProvider',
  function($stateProvider){
    $stateProvider
      .state('meraki_estimates', {
        url         : '/meraki_estimates',
        templateUrl : 'meraki-estimates/client/views/meraki-estimates-index.template.ng.html',
        controller  : 'MerakiEstimatesCtrl',
        controllerAs: 'estimates',
        resolve     : {
          "currentUser": ['$meteor', function($meteor){
            return $meteor.requireUser();
          }]
        }
      });
    }
  ]);