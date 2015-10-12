angular.module('conapps').directive('estimatesEditToolbar', estimatesEditToolbar);

function estimatesEditToolbar(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-edit-toolbar.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {
			products: '='
		},
	}
}

controller.$inject = [];

function controller(){
	
}

function link (scope, element, attr){}