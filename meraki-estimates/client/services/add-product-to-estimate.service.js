angular.module('conapps').service('addProductsToEstimateService', addProductsToEstimate);

addProductsToEstimate.$inject = [];

function addProductsToEstimate(){
	var _addProductsToEstimate = function(){
		this._products = [];
	}

	_addProductsToEstimate.prototype.emptyProducts = function() {
		angular.copy([], this._products);
	};

	_addProductsToEstimate.prototype.addProduct = function(product, quantity){
		var _product = this.findProduct(product)
		if (_product) 
			return _product.quantity += parseInt(quantity);
		product.quantity = parseInt(quantity);
		this._products.push(product);
	}

	_addProductsToEstimate.prototype.findProduct = function(product){
		if (!product || !product._id) throw new Meteor.Error('product-undefined');
		return _.find(this._products, function(_product){
			return _product._id === product._id;
		});
	}

	_addProductsToEstimate.prototype.modifyProductQuantityBy = function(product, quantity) {
		product.quantity += parseInt(quantity);
	};

	_addProductsToEstimate.prototype.removeProduct = function(product) {
		this._products = _.filter(this._products, function(_product){ 
			return _product._id !== product._id
		});
	};

	_addProductsToEstimate.prototype.run = function(products){
		if (!product) throw new Meteor.Error('invalid-estimate');
		angular.isArray(products) || (products = []);
		_.each(this._products, 	function (product){
			var qty = parseInt(product.quantity) || 1;
			var _product = _.find(
				this.products, function(p){ 
					return p._id === product._id
				}
			);
			if (_product)
				_product.quantity += qty;
	 		else
	 			this.products.push(product);
		});
		this._products = this.emptyProducts();
	}

	/////////

	return new _addProductsToEstimate();
}