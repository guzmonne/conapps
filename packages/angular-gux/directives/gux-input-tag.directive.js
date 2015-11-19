angular.module('angular-gux').directive('guxInputTag', guxInputTag);

guxInputTag.$inject = ['$timeout'];

function guxInputTag($timeout){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'guzmonne_angular-gux_templates/gux-input-tag.template.ng.html',
		controller       : function(){},
		controllerAs     : 'tag',
		bindToController : true,
		require: '^guxInputTags',
		scope            : {
			value: '@',
			index: '@'
		},
		link             : function(scope, element, attrs, tags){
			var tag = scope.tag;

			tag.remove = remove;
			tag.edit = edit;

			/////////
			
			function remove(){
				var index = parseInt(tag.index);

				tags.ngModel.splice(index, 1);
			}

			function edit(value){
				remove();

				tags.addTag();
				tags.newTag = value;

				$timeout().then(function(){
					$('[name="'+ tags.inputName +'"]').focus();
				});
			}

		},
	}
}