angular.module('conapps').directive('newEstimateForm', newEstimateForm);

function newEstimateForm(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/estimates-index/views/new-estimate-form.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {
			estimate: '='
		},
	}
}

controller.$inject = [];

function controller(){
	
}

function link (scope, element, attr){}