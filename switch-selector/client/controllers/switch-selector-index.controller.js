angular.module('switch-selector').controller('SwitchSelectorIndexCtrl', [
	'$scope', '$meteor', 'observeOnScope',
	function($scope, $meteor, observeOnScope){
		var self     = this;
		
		self.filters  = {};
		self.switches = [];

		self.activeSwitch = {};

		self.links = [
			{name: 'Home', address: '/'},
			{name: 'Switch Selector', address: '/switch-selector'},
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

		function collapse(object){
			if (!angular.isObject(object))
				return;
			_.each(object, function(val, key){
				if (val === false)
					delete object[key];
			});
			return object;
		}
	}
]);