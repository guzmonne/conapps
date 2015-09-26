angular.module('conapps').directive('estimatesToolbar', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/meraki-estimates-toolbar.template.ng.html',
	};
});