angular.module('conapps').service('merakiProductService', [
	'$meteor',
	function($meteor){
		var MerakiProductService = function(product){
			this.product = (product) ? product : this.defaultProduct();
		}

		MerakiProductService.prototype.setProduct = function (product){
			angular.copy(product, this.product);
		}

		MerakiProductService.prototype.getProduct = function get(product){
			return this.product;
		};

		MerakiProductService.prototype.setDefault = function setDefault(){
			this.setProduct({});
		}

		MerakiProductService.prototype.defaultProduct = function() {
			return {};
		};

		MerakiProductService.prototype.deleteProduct = function(product) {
			if (!product) throw new Meteor.Error('product-is-undefined');
			var productId;
			if (angular.isArray(product))
				_.each(product, p => this.deleteProduct(p) );
			if (angular.isString(product))
				productId = product;
			if (product && product._id)
				productId = product._id
			if (!productId) throw new Meteor.Error('invalid-product-id');
			return $meteor.call('deleteMerakiProduct', productId);
		};

		return new MerakiProductService();
	}
]);