angular.module('conapps').controller('MerakiClientsIndexCtrl', [
	'$scope', '$meteor', 'guxCollapse', 'showMerakiClientFormModal',
	function($scope, $meteor, collapse, showModal){
		var self = this;

		self.clients = [];

		self.links = [
			{name: 'Home', address: '/'},
			{name: 'Meraki Clients', address: '/meraki_clients'},
			{name: 'Index'},
		];

		self.filters = {};
		self.options = {};

		$meteor.autorun($scope, function(){
			$meteor
				.subscribe('clients', $scope.getReactively('index.filters'))
				.then(function(){
					self.clients = $meteor.collection(function(){
						var filters = collapse($scope.getReactively('index.filters'));
						var options = collapse($scope.getReactively('index.options'));
						return Clients.find(filters, options);
					});
				});
		});

		$scope.$watch('index.filters', function(){
			self.switches = $meteor.collection(function(){
				var filters = collapse($scope.getReactively('index.filters'));
				var options = collapse($scope.getReactively('index.options'));
				return Clients.find(filters);
			});
		}, true);

		$scope.$watch('index.options', function(){
			self.switches = $meteor.collection(function(){
				var filters = collapse($scope.getReactively('index.filters'));
				var options = collapse($scope.getReactively('index.options'));
				return Clients.find(filters);
			});
		}, true);
		
		self.showModal = showModal;
	}
]);