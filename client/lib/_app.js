angular.module('switch-selector', [
  'angular-meteor',
  'ui.router',
  'rx',
]);


function onReady() {
  angular.bootstrap(document, ['switch-selector']);
}

Meteor.startup(function(){
	angular.element(document).ready(onReady);
});

