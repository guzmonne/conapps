angular.module("conapps").config(['$stateProvider',
  function($stateProvider){
    $stateProvider
      .state('meraki_estimates', {
        url         : '/meraki_estimates',
        templateUrl : 'meraki-estimates/client/views/meraki-estimates.template.ng.html',
        controller  : 'MerakiEstimatesCtrl',
        controllerAs: 'estimates',
        abstract    : true,
      })
      .state('meraki_estimates.index', {
        url: '',
        views: {
          'estimates-toolbar': {
            template: '<estimates-toolbar></estimates-toolbar>'
          },
        },
        /*
        resolve : {
          "currentUser": ['$meteor', function($meteor){
            return $meteor.requireUser();
          }]
        },
        */
      });
    }
  ]);