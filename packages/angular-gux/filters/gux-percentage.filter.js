angular.module('angular-gux').filter('guxPercentage', guxPercentage);

guxPercentage.$inject = [];

function guxPercentage(){
	return function(input){
		if (!angular.isNumber(input)) return input;
		return Math.round(input * 100 * 100) / 100
	}
}