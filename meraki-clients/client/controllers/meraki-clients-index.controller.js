angular.module('conapps').controller('MerakiClientsIndexCtrl', [
	'$scope', '$meteor', 'guxCollapse', 'showModal', 'clientService', 'BreadcrumbsService',
	function($scope, $meteor, collapse, showModal, cs, breadcrumbsService){
		var self = this;

		self.filterString = '';

		self.clients = [];

		breadcrumbsService.links = [
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
						var filter  = $scope.getReactively('index.filter', true);
						var options = $scope.getReactively('index.options', true);
						return Clients.find(filter, options);
					});
				});
		});

		$scope.$watch('index.options', function(){
			if (self.options)
				self.clients = $meteor.collection(function(){
					return Clients.find(self.filter, self.options);
				});
		}, true);	

		$scope.$watch('index.filterString', function(){
			self.filter = (self.filterString === '') ?
				{} :
				{ stringSearch: { $regex: self.filterString.toLowerCase() } };
		}, true);

		self.showModal = function(){
			cs.resetClient();
			showModal('#addNewClientModal');
		};
	}
]);