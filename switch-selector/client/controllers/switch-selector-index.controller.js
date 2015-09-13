angular.module('conapps').controller('SwitchSelectorIndexCtrl', [
	'$scope', '$meteor', 'observeOnScope', 'guxCollapse',
	function($scope, $meteor, observeOnScope, collapse){
		var self     = this;
		
		self.filters  = {};
		self.switches = [];

		self.activeSwitch = {};

		self.links = [
			{name: 'Home', address: '/'},
			{name: 'Switch Selector', address: '/switch_selector'},
			{name: 'Index'}
		];

		$meteor.autorun($scope, function(){
			$meteor
				.subscribe('switches', $scope.getReactively('index.filters'))
				.then(function(){
					self.switches = $meteor.collection(function(){
						var filters = collapse($scope.getReactively('index.filters'));
						return Switches.find(filters);
					});
				});
		});

		$scope.$watch('index.filters', function(){
			self.switches = $meteor.collection(function(){
				var filters = collapse($scope.getReactively('index.filters'));
				return Switches.find(filters);
			});
		}, true);

		self.deleteFilter = function(name){
			delete self.filters[name] 
		};

		self.showModal = function(editableSwitch){
			self.activeSwitch = (editableSwitch) ? _.clone(editableSwitch) : {};
			$('#addNewSwitchModal').modal('toggle');
		};
	}
]);