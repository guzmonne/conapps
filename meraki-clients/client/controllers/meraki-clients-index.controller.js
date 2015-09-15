angular.module('conapps').controller('MerakiClientsIndexCtrl', [
	'$scope', '$meteor', 'guxCollapse', 'showMerakiClientFormModal',
	function($scope, $meteor, collapse, showModal){
		var self = this;

		self.filterString = '';

		self.clients = [];

		self.links = [
			{name: 'Home', address: '/'},
			{name: 'Meraki Clients', address: '/meraki_clients'},
			{name: 'Index'},
		];

		self.filter = {};
		self.options = {};

		$meteor.autorun($scope, function(){
			$meteor
				.subscribe('clients', $scope.getReactively('index.filter'))
				.then(function(){
					self.clients = $meteor.collection(function(){
						var filter  = collapse($scope.getReactively('index.filter'));
						var options = collapse($scope.getReactively('index.options'));
						return Clients.find(filter, options);
					});
				});
		});

		$scope.$watch('index.options', function(){
			if (self.options)
				self.clients = $meteor.collection(function(){
					return Clients.find(self.filter, self.options);
				});
			if (self.clients[0])
				console.log(self.clients[0].fullName)
		}, true);	

		self.updateFilters =  function(){
			if (!angular.isString(self.filterString)) return;
			if (self.filterString === '') {
				self.filter = {};
				return;
			}
			self.filter = { stringSearch: { $regex: self.filterString.toLowerCase() } };
		};
		
		self.showModal = showModal;
	}
]);