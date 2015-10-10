angular.module('conapps').directive('estimatesIndexTable', function(){
	return {
		restrict: 'E',
		replace : true,
		templateUrl: 'meraki-estimates/client/views/estimates-index-table.template.ng.html',
		scope: {},
		controller: ['$scope', '$meteor', function($scope, $meteor){
			this.collection = [];
			// Meteor Subscription
			$scope.$meteorSubscribe('estimates', {type: 'index'})
			.then(function(){
				this.collection = $meteor.collection(Estimates);
			}.bind(this));
		}],
		controllerAs: 'indexTable',
		bindToController: true,
	};
});