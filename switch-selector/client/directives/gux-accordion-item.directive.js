angular.module('switch-selector').directive('guxAccordionItem', [
	function(){
		return {
			restrict    : 'E',
			replace     : true,
			transclude  : true,
			templateUrl : 'switch-selector/client/views/gux-accordion-item.template.ng.html',
			require     : '^guxAccordion',
			scope       : {
				accordionItemLabel      : '@',
				accordionItemId         : '@',
				accordionItemCollapseId : '@',
			},
			controller  : [function(){
				this.parentId   = '';
				this.id         = this.accordionItemId         || _.uniqueId('accordionItem');
				this.collapseId = this.accordionItemCollapseId || _.uniqueId('collapse');
				this.label      = this.accordionItemLabel;
			}],
			controllerAs: 'accordionItem',
			bindToController: true,
			link: function(scope, element, attrs, accordion, transclude){
				scope.accordionItem.parentId = accordion.id;
				angular.element(element)
					.find('h4.panel-title > a')
					.attr('data-parent', scope.accordionItem.parentId);
			}
		};	
	}
]);