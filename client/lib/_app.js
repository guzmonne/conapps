angular.module('conapps', [
  'angular-meteor',
  'angular-gux',
  'ui.router',
  'rx',
]);


function onReady() {
  angular.bootstrap(document, ['conapps']);
}

Meteor.startup(function(){
	angular.element(document).ready(onReady);
});

