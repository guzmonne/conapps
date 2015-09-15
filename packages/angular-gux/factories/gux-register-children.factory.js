angular.module('angular-gux').service('GuxRegisterChildrenService', ['$q', function($q){
	function registerUpdateFunction(fn){
		if (!angular.isFunction(fn)) return;
		angular.isArray(this.updateFunctions) || (this.updateFunctions = []);
		this.updateFunctions.push(fn);
	}

	function callUpdateFunctions(fn){
		if (!angular.isArray(this.updateFunctions)) return;
		_.forEach(this.updateFunctions, function(fn){
			fn.call();
		});
	}

	var GuxRegisterChildren = function(context){
		context || (context = this);
		this.context = context;
		if (!angular.isArray(this.context.updateFunctions))
			this.context.updateFunctions = [];
		this.context.registerUpdateFunction = registerUpdateFunction.bind(this.context);
		this.context.callUpdateFunctions = callUpdateFunctions.bind(this.context);
	};

	GuxRegisterChildren.tryToRegisterUpdateFunctionTo = function(parentName, scope, fn){
		if (!parentName || !scope || !fn) return;
		if (!scope.$parent) return;
		var parent;
		//var parent = scope.$parent[parentName];
		searchForParent(scope, parentName)
		.then(function(result){
			parent = result;
			if (!parent || !angular.isObject(parent)) return;
			if (!angular.isFunction(parent.registerUpdateFunction)) return;
				parent.registerUpdateFunction(fn);
		})
		.catch(function(err){
			console.log(err);
		});
	};

	function searchForParent(scope, parentName, deferred){
		deferred || (deferred = $q.defer());
		var parent = scope.$parent;
		if (!parent || !angular.isObject(parent)) return;
		if (parent[parentName]) {
			deferred.resolve(parent[parentName]);
		} else if (angular.isObject(parent.$parent)) {
			searchForParent(parent, parentName, deferred);
		} else {
			deferred.reject(parentName + ' no found');
		}
		return deferred.promise;
	}

	return GuxRegisterChildren;
}]);