angular.module('conapps').directive('estimatesIndexTable', function(){
	return {
		restrict: 'E',
		replace : true,
		templateUrl: 'meraki-estimates/client/views/estimates-index-table.template.ng.html',
		scope: {
			collection: '=',
			options   : '=',
		},
		controller: ['$scope', '$meteor', function($scope, $meteor){
			this.chevronIfSorting = function(field){
				if (!this.options || !this.options.sort)
					return;
				if (this.options.sort === field)
					return (this.options.reverse) ? 'fa fa-chevron-down' : 'fa fa-chevron-up';
			}.bind(this);

			/**
			 * Updates the sort value
			 * @param  {String} field Field Name
			 * @return {Void}
			 */
			this.sortBy = function(field){
				var previousSort = this.options.sort;
				if (!field || !angular.isString(field)) 
					return;
				if (!previousSort || previousSort !== field) {
					this.options.sort    = field;
					this.options.reverse = false;
					return;
				} else {
					this.options.reverse = !this.options.reverse;
					return;
				}
			}.bind(this);
		}],
		controllerAs: 'indexTable',
		bindToController: true,
	};
});