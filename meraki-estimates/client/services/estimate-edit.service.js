angular.module('conapps').service('estimateEditService', estimateEditService);

estimateEditService.$inject = ['$rootScope', '$meteor', '$state', '$q'];

function estimateEditService($rootScope, $meteor, $state, $q){
	
	var service = {
		timestamp: null,

		_cached: {
			estimate: null,
			selectedProducts: [],
		},
		
		updated: $rootScope.$eventToObservable('updated'),

		getEstimate: function(id){
			if (!angular.isUndefined(id))
				return service._callGetEstimate(id);
			if (service._cached.estimate)
				return service._cached.estimate;
			else
				toastr.error('Undefined ID or not valid estimate');
		},

		_callGetEstimate: function(id){
		return $meteor.call('getEstimate', id)
			.then(function(estimate){
				angular.copy(estimate, service._cached.estimate);
				return estimate;
			})
			.catch(function(err){
				var deferred = $q.defer();
				toastr.error(err.reason);
				$state.go('meraki_estimates.index');
				console.log(err);
				return $q.reject();
			});
		},

		saveEstimateProducts: function(estimateId, products){
			return $meteor.call('saveEstimateProducts', products)
				.catch(function(err){
					var deferred = $q.defer();
					toastr.error(err.reason, err.error);
					console.log(err);
					return $q.reject();
				});
		},

		addProduct: function(product, quantity){
			if (!product)
				throwError('Undefined Product')

			if (!quantity || !angular.isNumber(parseInt(quantity)))
				throwError('Undefined Quantity or Quantity is NaN')

			var p = angular.copy(product);
			p.quantity = quantity;

			service._cached.selectedProducts.push(p);

			$rootScope.$emit('updated');
		},

		getSelectedProducts: function(){
			return service._cached.selectedProducts;
		},

		selectedProductsLength: function(){
			return service._cached.selectedProducts.length;
		}

	};

	return Object.create(service);
	
	//////////////

	function throwError(){
		throw new Meteor.Error(err);
		toastr.error(err, 'Error');
	}

}

/*

	function addProduct(){
		if (productNotExists(vm.product))
			modProdQty();
		else
			pushProduct();
	}

	// Object    -> true  -> false
	// Undefined -> false -> true
	function productNotExists(product){
		return !!findProduct(product._id);
	}

	function findProduct(_id){
		return _.find(vm.products, function(p){ return p._id === _id });	
	}

	function modProdQty(){
		var product = findProduct(vm.product._id); 
		product.quantity += parseInt(vm.quantity);
	}

	function pushProduct(){
		angular.isArray(vm.products) || (vm.products = []);
		product = angular.copy(vm.product);
		product.quantity = parseInt(vm.quantity);
		vm.products.push(product);
	}

	function removeProduct(){
		bs.confirmProductRemove()
			.then(function(){
				filterProduct(vm.product._id);
			});
	}

	function filterProduct(_id){
		vm.products = _.filter(vm.products, function(p){ p._id !== _id });
	}
 */