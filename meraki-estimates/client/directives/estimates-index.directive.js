angular.module('conapps').directive('estimatesIndex', function(){
	return {
		templateUrl : 'meraki-estimates/client/views/estimates-index.template.ng.html',
		restrict    : 'E',
		replace     : true,
		scope       : {},
		controller  : ['$scope', '$meteor', '$q',
		function($scope, $meteor, $q){
			this.collection = [];
			this.options    = {
				sort: '_id'
			};
			this.activeProduct = null;
			this.showModal = showModal;

			$scope.$meteorSubscribe('estimates', {type: 'index'})
			.then(function(subscriptionHandle){
				this.subscriptionHandle = subscriptionHandle;
				this.collection = $scope.$meteorCollection(setCollectionReactively, false);
			}.bind(this));

			function setCollectionReactively(){
				var parameters, 
						query        = {type: 'index'},
						sort         = $scope.getReactively('index.options.sort', true),
						reverse      = $scope.getReactively('index.options.reverse', true),
						stringSearch = $scope.getReactively('index.options.stringSearch', true);
				if (sort)
					query.sort = sort
				if (reverse)
					query.reverse = reverse
				if (stringSearch)
					query.stringSearch = stringSearch;
				parameters = Estimates.constructQuery(query);
				return Estimates.find(parameters.filters, parameters.options); 
			}

			function defaultProduct(){
				return {
					attributes: {},
				}
			}

			function showModal(){
				var deferred = $q.defer();
				if (!this.activeProduct)
					this.activeProduct = defaultProduct();
				$('#productListModalForm')
				.modal('toggle')
				.on('shown.bs.modal', function(){
					deferred.resolve();
				});
				return deferred.promise();
			}
		}],
		controllerAs: 'index'
	};
});