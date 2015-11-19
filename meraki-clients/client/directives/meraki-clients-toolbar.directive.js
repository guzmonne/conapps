angular.module('conapps').directive('merakiClientsToolbar', merakiClientsToolbar);

merakiClientsToolbar.$inject = ['rx', 'merakiClientsService'];

function merakiClientsToolbar(rx, mc){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'meraki-clients/client/views/meraki-clients-toolbar.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {},
		link: function(scope, element){

			let $stringSearch = element.find('[rel="stringSearch"]');

			let keyup = rx.Observable.fromEvent($stringSearch, 'keyup').
				map(e => e.target.value).        /* Project the text from the input */
				debounce(300).                   /* Pause for 300 ms */
				distinctUntilChanged().          /* Only if changed*/
				subscribe(text => mc.stringSearch.set(text));

			scope.$on('$destroy', () => {
				keyup.dispose();
				console.log('Unsubscribed from observer');
			}); 

		}
	}
}

controller.$inject = ['showModal', 'merakiClientsService'];

function controller(_showModal, mc){
	var vm = this;

	vm.showModal = showModal;

	///////////
	
	function showModal(){
		mc.setDefault();
		_showModal('#addNewClientModal');
	}
}