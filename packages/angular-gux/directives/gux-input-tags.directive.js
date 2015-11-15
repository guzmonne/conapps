angular.module('angular-gux').directive('guxInputTags', ['GuxRegisterChildrenService', function(registerChildren){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'guzmonne_angular-gux_templates/gux-input-tags.template.ng.html',
		scope: {
			ngModel: '=',
			maxTags: '@',
			inputPlaceholder: '@',
			inputName: '@',
			focusAfterMaxTag: '@',
			registerUpdateTo: '@'
		},
		controller: [function(){
			this.inputName || (this.inputName = 'newTag');
			this.newTag = '';
			this.canAddTag = function(){
				return this.ngModel.length < parseInt(this.maxTags);
			};
			this.addTag = function(options){
				var maxTags = parseInt(this.maxTags);
				if (!angular.isArray(this.ngModel) ||
						this.ngModel.length >= maxTags ||
						this.newTag === '')
					return;
				this.ngModel.push(this.newTag);
				this.newTag = '';
				if (this.ngModel.length >= maxTags)
					$('[name="' + this.focusAfterMaxTag + '"]').focus();
			}.bind(this);
		}],
		controllerAs: 'tags',
		bindToController: true,
		link: function(scope){
			var tags = scope.tags;
			registerChildren.tryToRegisterUpdateFunctionTo(tags.registerUpdateTo, scope, tags.addTag);
		},
	};
}]);