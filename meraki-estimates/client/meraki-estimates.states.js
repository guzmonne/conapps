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
          'estimates-workview': {
            template: '<h1>Here goes the Index WorkView</h1>'
          }
        },
        resolve : {
          "currentUser": ['$meteor', function($meteor){
            return $meteor.requireUser();
          }]
        },
      })
      .state('meraki_estimates.edit', {
        url: '/edit',
        views: {
          'estimates-toolbar': {
            template: '<h1>Here goes the New Sidebar Toolbar</h1>'
          },
          'estimates-workview': {
            template: '<h1>Here goes the New WorkView</h1>'
          }
        },
        resolve : {
          "currentUser": ['$meteor', function($meteor){
            return $meteor.requireUser();
          }]
        },
      })
      .state('meraki_estimates.shared', {
        url: '/shared',
        views: {
          'estimates-toolbar': {
            template: '<estimates-toolbar></estimates-toolbar>'
          },
          'estimates-workview': {
            template: '<h1>Here goes the Shared WorkView</h1>'
          }
        },
        resolve : {
          "currentUser": ['$meteor', function($meteor){
            return $meteor.requireUser();
          }]
        },
      })
      .state('meraki_estimates.price_list', {
        url: '/price_list',
        views: {
          'estimates-toolbar': {
            template: '<estimates-toolbar></estimates-toolbar>'
          },
          'estimates-workview': {
            template: '<h1>Here goes the PriceList WorkView</h1>'
          }
        },
        resolve : {
          "currentUser": ['$meteor', function($meteor){
            return $meteor.requireUser();
          }]
        },
      });
    }
  ]);