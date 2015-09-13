angular.module('angular-gux').service('GuxRegisterChildrenService', [function(){
	function registerUpdateFunction(fn){
		if (!angular.isFunction(fn)) return;
		angular.isArray(this.updateFunctions) || (this.updateFunctions = []);
		this.updateFunctions.push(fn);
	};

	var GuxRegisterChildren = function(context){
		context || (context = this);
		this.context = context;
		if (!angular.isArray(this.context.updateFunctions))
			this.context.updateFunctions = [];
		this.context.registerUpdateFunction = registerUpdateFunction.bind(this.context);
	}

	GuxRegisterChildren.tryToRegisterUpdateFunctionTo = function(parentName, scope, fn){
		if (!parentName || !scope || !fn) return;
		if (!scope.$parent) return;
		var parent = scope.$parent[parentName];
		if (!parent || !angular.isObject(parent)) return;
		if (!angular.isFunction(parent.registerUpdateFunction)) return;
			parent.registerUpdateFunction(fn);
	};

	return GuxRegisterChildren;
}]);