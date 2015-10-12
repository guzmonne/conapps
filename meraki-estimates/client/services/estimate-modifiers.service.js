angular.module('conapps').service('estimateModifiers', estimateModifiers);

estimateModifiers.$inject = [];

function estimateModifiers(){
	function defaults(){
		return {
			introduction : 0.25,
			hwMargin     : 0.25,
			swMargin     : 0.25,
			admMargin    : 0.25
		}
	}

	return {
		defaults: defaults,
	}
}