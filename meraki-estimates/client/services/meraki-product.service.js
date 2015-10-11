angular.module('conapps').service('merakiProductService', function(){
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
		this.setProduct({ attributes: {} });
	}

	MerakiProductService.prototype.defaultProduct = function() {
		return { attributes: {} };
	};

	return new MerakiProductService();
});