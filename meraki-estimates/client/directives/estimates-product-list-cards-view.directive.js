angular.module('conapps').directive('estimatesProductListCardsView', function(){
	return {
		restirct    : 'E',
		replace     : true,
		templateUrl : 'meraki-estimates/client/views/estimates-product-list-cards-view.template.ng.html',
		scope       : {
			options  : '=',
			products : '='
		},
		controller       : [function(){}],
		controllerAs     : 'vm',
		bindToController : true,
	};
});