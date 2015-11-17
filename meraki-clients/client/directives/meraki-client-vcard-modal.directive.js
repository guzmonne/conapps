angular.module('conapps').directive('merakiClientVcardModal', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'meraki-clients/client/views/meraki-client-vcard-modal.template.ng.html',
		controller: ['clientService', function(clientService){
			this.client = clientService.client;
			this.store  = {};

			this.downloadVCard = function(){
				var blob = new Blob([vCard(clientService.client)], { type: 'text/vcard' });
				saveAs(blob, clientService.client.fullName + ' - Tarjeta.vcf');
			}.bind(this);
			
			this.makeCode = function (){
				if (this.qrcode)
					this.qrcode.clear();
				else
					this.qrcode = new QRcode('qrcode', {width: 300, height: 300});
				this.qrcode.makeCode(vCard(this.clientClone));
			}.bind(this);

			this.toggleValue = function(key, index){
				if (angular.isUndefined(key) || angular.isUndefined(index)) return;
				if (!angular.isArray(this.client[key])) return;
				if (!angular.isArray(this.clientClone[key])) return;
				if (this.store[key] && this.store[key][index]){
					this.clientClone[key].splice(index, 0, this.store[key][index]);
					delete this.store[key][index];
					this.client
				} else {
					var array = Array.apply(this, this.client[key]);
					this.store[key] || (this.store[key] = {});
					this.store[key][index] = array.splice(index, 1)[0];
					this.clientClone[key] = array;
				}
				this.makeCode();
			};

			this.isUndefined = function(key, index){
				return angular.isUndefined(this.store[key]) || angular.isUndefined(this.store[key][index]);
			}.bind(this);
		}],
		controllerAs: 'vCardModal',
		bindToController: true,
		link: function(scope, element){
			scope.$watch('vCardModal.client', function(n){
				if (element.find('#qrcode') && element.find('#qrcode').hasClass('in'))
					scope.vCardModal.makeCode();
				scope.vCardModal.clientClone = angular.copy(scope.vCardModal.client);
				scope.vCardModal.store = {};
			}, true);
		}
	};
});