angular.module('conapps').directive('estimatesIndexToolbar', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-estimates/client/views/estimates-index-toolbar.template.ng.html',
		scope: {
			options: '=',
		},
		controller: [function(){
			this.stringSearch = '';
			this.updateFilters = function(){
				this.options.stringSearch = this.stringSearch;
				console.log(this.options);
			}.bind(this);
		}],
		controllerAs: 'indexToolbar',
		bindToController: true,
	};
});