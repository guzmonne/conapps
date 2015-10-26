angular.module('conapps').service('estimateEditService', estimateEditService);

estimateEditService.$inject = ['$rootScope', '$meteor', '$state', '$q'];

function estimateEditService($rootScope, $meteor, $state, $q){
	
	var s = {
		estimate: {},

		selectedProducts: [],

		subscription: null,
		
		selectedProductsObs: $rootScope.$eventToObservable('selectedProducts:updated'),

		getEstimate: function(id){
			if (!angular.isUndefined(id))
				return s._callGetEstimate(id);
			if (s.estimate)
				return s.estimate;
			else
				toastr.error('Undefined ID or not valid estimate');
		},

		_subscribeToEstimate: function(id){
			return $meteor.subscribe('estimate', id)
				.then(sub => {
					s.subscription = sub;
					s.estimate     = $meteor.object(Estimates, id, false);
					return s.estimate;
				});
		},

		_callGetEstimate: function(id){
			return $meteor.call('estimate:get', id)
				.then(function(estimate){
					angular.copy(estimate, s.estimate);
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
			s._callGetEstimate(s.estimate._id);
		},

		_resetAttrs: function(){
			$meteor.call('estimate:get:attrs', s.estimate._id)
				.then(function(attrs){
					_.extend(s.estimate, attrs);
				})
				.catch(throwError)
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

			s.selectedProducts.push(p);

			$rootScope.$emit('selectedProducts:updated');
		},

		getSelectedProducts: function(){
			return s.selectedProducts;
		},

		selectedProductsLength: function(){
			return s.selectedProducts.length;
		},

		addProductsToEstimate: function(){
			var promise, attrs;

			attrs = s.selectedProducts.map(function(p){
				return { _id: p._id, quantity: p.quantity};
			});

			promise = $meteor.call('estimate:add:products', s.estimate._id, attrs, s.estimate.years)
				.then(function(result){
					toastr.success('Productos agregados.', 'Estimate ' + s.estimate._id);
					s._reset();
					return result;
				})
				.catch(s.handleError);

			return promise;
		},

		handleError: function(err){
			var deferred = $q.defer();
			toastr.error(err.reason, err.error);
			console.log(err);
			return $q.reject();
		},

		cleanSelected: function(){
			angular.copy([], s.selectedProducts);
			$rootScope.$emit('selectedProducts:updated');
		},

		toggleDeal: function(){
			$meteor.call('toggleDeal', s.estimate._id)
				.then(function(deal){
					var status = (!s.estimate.deal) ? 'ON' : 'OFF';
					toastr.success('Deal ' + status);
					s._resetAttrs();
				})
				.catch(throwError)
		},

		toggleCustomDiscount: function(){
			$meteor.call('toggleCustomDiscount', s.estimate._id)
				.then(function(){
					toastr.success('Actualizado');
					if (s.estimate.customDiscount === false)
						s.estimate.discount = (s.estimate.deal) ? 0.43 : 0.35;
				})
				.catch(function(err){
					throwError(err);
					s.estimate.discount = (s.estimate.deal) ? 0.43 : 0.35;
				});
		},

		updateYears: function(){
			$meteor.call('estimate:update:years', s.estimate._id, s.estimate.years)
				.then(function(){
					toastr.success('Actualizado');
					s._reset();
				})
				.catch(throwError);
		},

		updateProductQty: function(attrs){
			attrs._id = s.estimate._id;
			$meteor.call('estimate:modify:product:quantity', attrs)
				.then(function(result){
					toastr.success('Cantidad modificada', '¡OK!');
				})
				.catch(throwError);
		}

	};

	return Object.create(s);
	
	//////////////

	function throwError(err){
		throw new Meteor.Error(err);
		toastr.error(err, 'Error');
	}

}