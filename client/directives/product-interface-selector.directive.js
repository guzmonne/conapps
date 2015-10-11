angular.module('conapps').directive('productInterfaceSelector', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'client/views/product-interface-selector.template.ng.html',
		scope: {
			interfaces: '=',
		},
		controller: [function(){
			// Public Variables
			this.interfaces || (this.interfaces = []);
			this.options = options;
			// Public Methods
			this.addInterface = addInterface.bind(this);
			this.removeInterface = removeInterface.bind(this);
			// Private Methods
			function defaultInterface(){
				return {
					type: null,
					ammount: null,
				}
			}
			function addInterface() {
				this.interfaces.push(defaultInterface());
				this.element.find('#interface' + this.interfaces.length).focus();
			}
			function removeInterface(index){
				this.interfaces.splice(index, 1);
				this.element.find('#interface' + this.interfaces.length).focus();
			}
		}],
		controllerAs: 'vm',
		bindToController: true,
		link: function(scope, element){
			scope.vm.element = element;
		}
	};
});

var options = [
	'FE',
	'GE',
	'SFP',
	'SFP+',
	'QSFP+',
	'802.11n',
	'802.11ac/n'
];
