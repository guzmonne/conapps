angular.module('angular-gux').directive('guxMultipleAddresses', ['GuxRegisterChildrenService', function(registerChildren){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			ngModel: '=',
			inputStreetName: '@',
			maxAddresses: '@',
			registerUpdateTo: '@',
		},
		require: 'ngModel',
		templateUrl: 'guzmonne_angular-gux_templates/gux-multiple-addresses.template.ng.html',
		controller: [function(){
			this.maxAddresses || (this.maxAddresses = 3);
			this.inputStreetName || (this.inputStreetName = 'newStreet');
			this.newAddress = {};
			this.addresses  = this.ngModel;
			this.addAddress = function(){
				if (!this.newAddress.street || this.newAddress.street === '') return;
				console.log(this.newAddress.street);
				this.addresses.push(this.newAddress);
				this.newAddress = {};
				$('[name="' + this.inputStreetName + '"]').focus();
			}.bind(this);
			this.canAddAddress = function(){
				if (!angular.isArray(this.addresses)) return;
				return this.addresses.length < parseInt(this.maxAddresses);
			};
			this.removeAddress = function(index){
				if (!angular.isArray(this.addresses)) return;
				this.addresses.splice(index, 1);
				$('[name="' + this.inputStreetName + '"]').focus();
			}.bind(this);
			this.editAddress = function(address, index){
				this.removeAddress(index);
				this.newAddress = address;
				$('[name="' + this.inputStreetName + '"]').focus();
			}.bind(this);
		}],
		controllerAs: 'multiple',
		bindToController: true,
		link: function(scope){
			var multiple = scope.multiple;
			registerChildren.tryToRegisterUpdateFunctionTo(multiple.registerUpdateTo, scope, multiple.addAddress);
		}
	};
}]);