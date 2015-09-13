angular.module('angular-gux').directive('guxInputTag', ['$timeout', function($timeout){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'guzmonne_angular-gux_templates/gux-input-tag.template.ng.html',
		scope: {
			value: '@',
			index: '@'
		},
		controller: [function(){}],
		controllerAs: 'tag',
		bindToController: true,
		require: '^guxInputTags',
		link: function(scope, element, attrs, tags){
			scope.tag.remove = function(){
				tags.ngModel.splice(parseInt(scope.tag.index), 1);
			};
			scope.tag.edit = function(value){
				scope.tag.remove();
				tags.newTag = value;
				$timeout().then(function(){
					$('[name="' + tags.inputName + '"]').focus();	
				});
			};
		}
	};
}]);