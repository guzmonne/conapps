angular.module('conapps').directive('merakiClientsTable', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {
			clients: '=',
			options: '=',
		},
		templateUrl: 'meraki-clients/client/views/meraki-clients-table.template.ng.html',
		controller: [function(){
			this.orderBy = function(key){
				this.options                        || (this.options = {});
				angular.isObject(this.options.sort) || (this.options.sort = {});
				switch(this.options.sort[key]){
					case 1:
						this.options.sort[key] = -1;
						break;
					case -1:
						delete this.options.sort[key];
						break;
					default:
						this.options.sort = {};
						this.options.sort[key] = 1;
						break;
				}
				if (_.keys(this.options.sort).length === 0)
					this.options = {};
				console.log(this.options);
			}.bind(this);
			this.showChevronFor = function(key){
				if (!this.options || !this.options.sort || !this.options.sort[key]) 
					return false;
				if (this.options.sort[key] === 1)
					return 'fa-chevron-up';
				if (this.options.sort[key] === -1)
					return 'fa-chevron-down';
			}
		}],
		controllerAs: 'table',
		bindToController: true,
	};
});