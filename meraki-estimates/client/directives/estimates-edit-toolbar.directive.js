angular.module('conapps').directive('estimatesEditToolbar', estimatesEditToolbar);

function estimatesEditToolbar(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-estimates/client/views/estimates-edit-toolbar.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			products: '='
		},
	}
}

controller.$inject = ['showModal'];

function controller(showModalService){
	this.showModal = showModal;

	///////////
	
	function showModal(){
		showModalService('#estimatesAddProductsModal');
	}
}
