angular.module('conapps').service('BreadcrumbsService', function() {
	function _BreadcrumbsService(links){
		this.links = links; 
	}

	_BreadcrumbsService.prototype.setLinks = function(links) {
		if (!angular.isArray(links)) return;
		angular.copy(links, this.links);
	};

	return new _BreadcrumbsService([{name: 'Home', address: '/'}]);
});