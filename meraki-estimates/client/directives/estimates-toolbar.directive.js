angular.module('conapps').directive('estimatesToolbar', function($location){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/meraki-estimates-toolbar.template.ng.html',
		link: function(scope, element){
			var location = $location.$$url;
			if (location.indexOf('/meraki_estimates/edit') > -1)
				location = '/meraki_estimates'
			element.find('a[href="'+location+'"]').addClass('active');
			element.find('a').click( e => {
				element.find('a').removeClass('active');
				element.find(e.currentTarget).addClass('active');
			});
		}
	};
});