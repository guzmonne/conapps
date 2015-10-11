angular.module('conapps').directive('datasheetButton', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'client/views/datasheet-button.template.ng.html',
		scope: {
			datasheetUrl: '@',
			fileName: '@',
		},
		controller: [function(){
			this.fileName || (this.fileName = 'datahseet');
		}],
		controllerAs: 'datasheetButton',
		bindToController: true,
	};
});