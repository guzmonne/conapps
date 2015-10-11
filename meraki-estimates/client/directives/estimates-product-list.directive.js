angular.module('conapps').directive('estimatesProductList', function(){
	return {
		restrict    : 'E',
		replace     : true,
		templateUrl : 'meraki-estimates/client/views/estimates-product-list.template.ng.html',
		scope       : {},
		controller  : ['$scope', '$meteor', function($scope, $meteor){
			this.options    = {
				sort: '_id',
			};
			this.collection = [];

			$scope.$meteorSubscribe('merakiProducts', getParametersReactively())
			.then(function(subscriptionHandle){
				this.subscriptionHandle = subscriptionHandle;
				this.collection         = $scope.$meteorCollection(setCollectionReactively, false);
			}.bind(this));

			function setCollectionReactively(){
				var query      = getParametersReactively();
				var parameters = MerakiProducts.constructQuery(query);
				return MerakiProducts.find(parameters.filters, parameters.options);
			}

			function getParametersReactively(){
				var query        = {type: 'index'},
						sort         = $scope.getReactively('productList.options.sort'),
						reverse      = $scope.getReactively('productList.options.reverse', true),
						stringSearch = $scope.getReactively('productList.options.stringSearch');
				if (sort)
					query.sort = sort;
				if (reverse)
					query.reverse = reverse;
				if (stringSearch)
					query.stringSearch = stringSearch;
				return query;
			}
		}],
		controllerAs     : 'productList',
		bindToController : true,
	}
});