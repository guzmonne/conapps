angular.module('conapps').filter('setDecimal', function(){
	return function(input, places){
		if (!angular.isNumber(input)) return input;
		return parseFloat(Math.round(input * 100) / 100).toFixed(2);
	}
});