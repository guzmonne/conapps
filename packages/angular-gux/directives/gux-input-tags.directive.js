angular.module('angular-gux').directive('guxInputTags', guxInputTags);

function guxInputTags(){
	return {
		restrict         : 'E',
		replace          : true,
		transclude       : true,
		templateUrl      : 'guzmonne_angular-gux_templates/gux-input-tags.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		scope            : {
			ngModel: '=',
			maxTags: '@',
			inputPlaceholder: '@',
			inputName: '@',
			focusAfterMaxTag: '@',
			remoteAddTag: '='
		},
	}
}

function controller(){
	var vm = this;

	vm.newTag = '';
	vm.canAddTag = canAddTag;
	vm.addTag = addTag;

	activate();

	/////////
	
	function activate(){
		vm.inputName || (vm.inputName = 'newTag');

		if (vm.remoteAddTag || vm.remoteAddTag === null)
			vm.remoteAddTag = addTag;
	}

	function canAddTag(){
		if(!angular.isArray(vm.ngModel)) return;

		return vm.ngModel.length < parseInt(vm.maxTags);
	}

	function addTag(){
		var maxTags = parseInt(vm.maxTags);

		if ( !angular.isArray(vm.ngModel)
			|| vm.ngModel.length >= maxTags
			|| vm.newTag === ''
		) 
			return;

		vm.ngModel.push(vm.newTag);
		vm.newTag = '';

		if ( vm.ngModel.length >= maxTags
			&& angular.isString(vm.focusAfterMaxTag)
		)
			$('[name="'+ vm.focusAfterMaxTag +'"]').focus()
	}
	
}