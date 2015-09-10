angular.module('switch-selector').directive('guxForm', function(){
	return {
		restrict: 'A',
		controller: [function(){
			var self  = this;
			self.data = {};
		}],
		controllerAs: 'guxForm',
	};
});