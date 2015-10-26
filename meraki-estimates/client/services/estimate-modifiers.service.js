angular.module('conapps').service('estimateModifiers', estimateModifiers);

estimateModifiers.$inject = ['estimateEditService'];

function estimateModifiers(es){
	
	var weights = {
		support: {
			'8x5xNBD': 1.03,
			'24x7x1x6': 2.21,
		},
		administration: {
			'8x5xNBD': 4.72,
			'24x7x1x6': 7.07,
		}
	};

	var params = {
		a: 3,
		b: 0.85
	};

	function weightByQty(qty){
		return params.a * Math.pow(params.b, qty);
	}

	function calculateCost(_item, options){
		var estimate = es.estimate;
		var item = parseFloat(_item);

		options || (options = { isSoftware: false });

		if (angular.isNumber(estimate.discount))
			item = item * (1.00 - parseFloat(estimate.discount));

		if (angular.isNumber(estimate.intCost) && options.isSoftware === false)
			item = item * (1.00 + parseFloat(estimate.intCost));

		if (angular.isNumber(estimate.hwMargin) && options.isSoftware === false)
			item = item / (1.00 - parseFloat(estimate.hwMargin));

		if (angular.isNumber(estimate.swMargin) && options.isSoftware === true)
			item = item / (1.00 - parseFloat(estimate.swMargin));
		
		return item;
	}
	
	function hwCost(){
		return calculateCost(hwTotal());
	}

	function hwTotal(){
		if (angular.isArray(es.estimate.products) && es.estimate.products.length > 0){
			return total(es.estimate.products);
		}
		return 0;
	}

	function swCost(options){	
		return calculateCost(swTotal(), {isSoftware: true});
	}

	function swTotal(){
		if (angular.isArray(es.estimate.licenses) && es.estimate.licenses.length > 0)
			return total(es.estimate.licenses);
		return 0;
	}

	function total(collection){
		var result = _.reduce(collection, function(accumulated, model){
				if (!angular.isNumber(model.price) || !angular.isNumber(model.quantity))
					return 0;
				return parseFloat(model.quantity) * parseFloat(model.price) + parseFloat(accumulated);
			}, 0);
		return result;
	}

	function estimateYearsInMonths(){
		var estimate = es.estimate;

		if (estimate && estimate.years)
			return parseInt(estimate.years) * 12;
	}

	function swCostPerMonth(){
		var licensesCost, months;

		licensesCost  = parseFloat(swCost());
		months        = parseFloat(estimateYearsInMonths());
		
		return  licensesCost / months; 
	}

	function supCostPerMonth(){
		var licensesCost, supportCost, months, supportWeight, supMargin;

		if (!es.estimate || !es.estimate.serviceLvl || !es.estimate.discount)
			return 0;

		licensesCost  = parseFloat( swTotal() * es.estimate.discount );
		supportWeight = weights.support[es.estimate.serviceLvl];
		supMargin     = parseFloat(es.estimate.supMargin);
		supportCost   = ( licensesCost * supportWeight ) / (1 - supMargin);
		months        = parseFloat(estimateYearsInMonths());
		
		return  supportCost / months; 
	}

	function admCostPerMonth(){
		var licensesWeightedCost, discount, months, supMargin;

		if (!es.estimate || angular.isArray(!es.estimate.licenses))
			return 0;

		discount  = parseFloat(es.estimate.discount);
		supMargin = parseFloat(es.estimate.supMargin);
		months    = parseFloat(estimateYearsInMonths());

		licensesWeightedCost = _.reduce(es.estimate.licenses, function(total, license){
			var quantity = parseFloat(license.quantity);
			var price    = parseFloat(license.price);

			return price * weightByQty(quantity) + total;
		}, 0);

		return licensesWeightedCost * (1 - discount) / ( 1 - supMargin) / months;

		/*
		var licensesCost, adminCost, months, adminWeight, supMargin;
		
		if (!es.estimate || !es.estimate.serviceLvl || !es.estimate.discount)
			return 0;
		
		licensesCost = parseFloat( swTotal() * (1 - es.estimate.discount) );
		adminWeight  = weights.administration[es.estimate.serviceLvl];
		supMargin    = parseFloat(es.estimate.supMargin);
		adminCost    = ( licensesCost * adminWeight ) / (1 - supMargin);
		months       = parseFloat(estimateYearsInMonths());

		return  adminCost / months;
		*/
	}

	function traditionalMonthlyPayment(){
		return ( parseFloat( swCostPerMonth() ) + parseFloat( supCostPerMonth() ) ) || 0;  
	}

	function administeredMonthlyPayment(){
		return ( traditionalMonthlyPayment() + parseFloat( admCostPerMonth() ) ) || 0;
	}

	function unifiedMonthlyPayment(){
		return ( administeredMonthlyPayment() + parseFloat( hwCost() * 0.04 ) ) || 0;
	}

	///////////
	
	var s = {
		calculateCost              : calculateCost,
		hwCost                     : hwCost,
		swCost                     : swCost,
		swCostPerMonth             : swCostPerMonth,
		weights                    : weights,
		params                     : params,
		traditionalMonthlyPayment  : traditionalMonthlyPayment,
		administeredMonthlyPayment : administeredMonthlyPayment,
		unifiedMonthlyPayment      : unifiedMonthlyPayment,
		supCostPerMonth            : supCostPerMonth,
		admCostPerMonth            : admCostPerMonth,
	}

	///////////
	
	return Object.create(s);
}