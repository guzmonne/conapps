// It requires momentJS to be present

angular.module('angular-gux').filter('guxCalendar', guxCalendar);

guxCalendar.$inject = [];

function guxCalendar(){
	return function(date){
		return moment(date).calendar();
	}
}