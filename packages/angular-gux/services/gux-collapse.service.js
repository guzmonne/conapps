angular.module('angular-gux').service('guxCollapse', function(){
	return function (object){
		if (!angular.isObject(object))
			return;
		_.each(object, function(val, key){
			if (val === false)
				delete object[key];
		});
		return object;
	};
});