angular.module('conapps').service('estimateEditService', estimateEditService);

estimateEditService.$inject = ['$rootScope', '$meteor', '$state', '$q'];

function estimateEditService($rootScope, $meteor, $state, $q){
	
	var service = {
		estimate: {},

		selectedProducts: [],

		subscription: null,
		
		selectedProductsObs: $rootScope.$eventToObservable('selectedProducts:updated'),

		getEstimate: function(id){
			if (!angular.isUndefined(id))
				//return service._subscribeToEstimateReactively(id);
				//$meteor.object(Estimates, id, false).subscribe('estimate');
				return service._callGetEstimate(id);
			if (service.estimate)
				return service.estimate;
			else
				toastr.error('Undefined ID or not valid estimate');
		},

		_subscribeToEstimate: function(id){
			return $meteor.subscribe('estimate', id)
				.then(sub => {
					service.subscription = sub;
					service.estimate     = $meteor.object(Estimates, id, false);
					return service.estimate;
				});
		},

		_callGetEstimate: function(id){
			return $meteor.call('getEstimate', id)
				.then(function(estimate){
					angular.copy(estimate, service.estimate);
					return;
				})
				.catch(function(err){
					var deferred = $q.defer();
					toastr.error(err.reason);
					$state.go('meraki_estimates.index');
					console.log(err);
					return $q.reject();
				});
		},

		_reset: function(){
			service._callGetEstimate(service.estimate._id);
		},

		saveEstimateProducts: function(estimateId, products){
			return $meteor.call('saveEstimateProducts', products)
				.catch(handleError);
		},

		addProduct: function(product, quantity){
			if (!product)
				throwError('Undefined Product')

			if (!quantity || !angular.isNumber(parseInt(quantity)))
				throwError('Undefined Quantity or Quantity is NaN')

			var p = angular.copy(product);
			p.quantity = quantity;

			service.selectedProducts.push(p);

			$rootScope.$emit('selectedProducts:updated');
		},

		getSelectedProducts: function(){
			return service.selectedProducts;
		},

		selectedProductsLength: function(){
			return service.selectedProducts.length;
		},

		addProductsToEstimate: function(){
			var promise, pIDsQty;

			pIDsQty = this.selectedProducts.map(function(p){
				return { _id: p._id, quantity: p.quantity };
			});

			promise = $meteor.call('addProductsToEstimate', this.estimate._id, pIDsQty)
				.then(function(result){
					toastr.success('Productos agregados.', 'Estimate ' + this.estimate._id);
					service._reset();
					return result;
				}.bind(this))
				.catch(this.handleError);

			return promise;
		},

		handleError: function(err){
			var deferred = $q.defer();
			toastr.error(err.reason, err.error);
			console.log(err);
			return $q.reject();
		},

		cleanSelected: function(){
			service.selectedProducts = [];
			$rootScope.$emit('selectedProducts:updated');
		},

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