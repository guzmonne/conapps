angular.module('conapps').service('estimateModifiers', estimateModifiers);

estimateModifiers.$inject = ['estimateEditService'];

function estimateModifiers(es){
	var s = {
		hwCost: hwCost,
		swCost: swCost,
		swCostPerMonth: swCostPerMonth,
		weights: weights,
	}

	///////////
	
	var weights = {
		support: {
			'8x5xNBD': 0.972,
			'24x7xNBD': 2.08,
		},
		administration: {
			'8x5xNBD': 4.448,
			'24x7xNBD': 6.67,
		}
	};
	
	function hwCost(){
		var result, estimate;

		estimate = es.estimate;
		
		if (angular.isArray(estimate.products) && estimate.products.length > 0) 
			result = _.reduce(estimate.products, function(t, p){
				if (!p.price || !p.quantity) return t;
				return (parseFloat(p.price) * parseFloat(p.quantity) + parseFloat(t))
			}, 0);

		if (angular.isNumber(estimate.discount))
			result = result * (1.00 - parseFloat(estimate.discount));

		if (angular.isNumber(estimate.intCost))
			result = result * (1.00 + parseFloat(estimate.intCost));

		if (angular.isNumber(estimate.hwMargin))
			result = result / (1.00 - parseFloat(estimate.hwMargin));

		return result;
	}

	function swCost(){
		var discount, result, estimate;

		estimate = es.estimate;

		if (!estimate) return 1;
		
		if (angular.isArray(estimate.licenses) && estimate.licenses.length > 0) 
			result = _.reduce(estimate.licenses, function(t, l){
				if (!l.price || !l.quantity) return t;
				return (parseFloat(l.price) * parseFloat(l.quantity) + parseFloat(t))
			}, 0);

		if (angular.isNumber(estimate.discount))
			result = result * (1.00 - parseFloat(estimate.discount));

		if (angular.isNumber(estimate.swMargin))
			result = result / (1.00 - parseFloat(estimate.swMargin));

		return result;
	}

	function estimateYearsInMonths(){
		var estimate = es.estimate;

		if (estimate && estimate.years)
			return parseInt(estimate.years) * 12;
	}

	function swCostPerMonth(){
		var licensesCost, supportCost, months, supportWeight, supMargin;

		if (!es.estimate || !es.estimate.serviceLvl || !es.estimate.supMargin)
			return 1;

		licensesCost  = parseFloat(swCost());
		months        = parseFloat(estimateYearsInMonths());
		
		return  licensesCost / months; 
	}

	function supCostPerMonth(){
		var licensesCost, supportCost, months, supportWeight, supMargin;

		if (!es.estimate || !es.estimate.serviceLvl || !es.estimate.supMargin)
			return 1;

		licensesCost  = parseFloat(swCost());
		supportWeight = weights.support[es.estimate.serviceLvl];
		supMargin     = parseFloat(es.estimate.supMargin);
		supportCost   = ( licensesCost * supportWeight ) / (1 - supMargin);
		months        = parseFloat(estimateYearsInMonths());
		
		return  supportCost / months; 
	}

	function admCostPerMonth(){
		var licensesCost, adminCost, months, adminWeight, supMargin;
		
		if (!es.estimate || !es.estimate.serviceLvl || !es.estimate.supMargin)
			return 1;
		
		licensesCost = parseFloat(swCost());
		adminWeight  = weights.administration[es.estimate.serviceLvl];
		supMargin    = parseFloat(es.estimate.supMargin);
		adminCost    = ( licensesCost * supportWeight ) / (1 - supMargin);
		months       = parseFloat(estimateYearsInMonths());

		return  supportCost / months;
	}

	///////////
	
	return Object.create(s);
}