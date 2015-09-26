angular.module('conapps').directive('estimatesToolbar', function($location){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/meraki-estimates-toolbar.template.ng.html',
		link: function(scope, element){
			element.find('a[href="'+$location.$$url+'"]').addClass('active');
		}
	};
});