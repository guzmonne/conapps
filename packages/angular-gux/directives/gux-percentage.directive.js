angular.module('angular-gux').directive('guxPercentageInput', guxPercentageInput);

function guxPercentageInput(){
	return {
		restrict : 'A',
		require  : 'ngModel',
		link     : link,
	}
}

function link (scope, element, attr, ngModel){
	ngModel.$formatters.push(function(val){
		return Math.round(val * 100 * 100) / 100;
	});
	ngModel.$parsers.push(function(val){
		return val / 100;
	});
}