angular.module('conapps').directive('sidebar', sidebar);

function sidebar(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'client/views/sidebar.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {},
	}
}

controller.$inject = ['$timeout'];

function controller($timeout){
	var vm = this;

	vm.hasRole = App.auth.hasRole;
	vm.style = { 'display': 'none' };
	vm.class = "";

	vm.toggleBlockWithDelay = toggleBlockWithDelay;
	
	////////
	
	function toggleBlockWithDelay(){
		$timeout(function(){
			vm.style.display = (vm.style.display === 'none') ? 'block' : 'none';
		}, 200);
	}
}

function link (scope, element, attr){
	var style = {'margin-left': -180};
	var isVisible = false;

	var tweenStyle = new TWEEN.Tween(style);

	/////

	scope.$on('toggle:sidebar', function(e, isVisible){
		tweenStyle.stop();

		scope.vm.toggleBlockWithDelay();
			
		if (isVisible === true)
			tweenStyle.
				to({'margin-left': 0}, 400).
				onUpdate(updatestyle).
				easing(TWEEN.Easing.Back.In).
				start();
		else
			tweenStyle.
				to({'margin-left': -180}, 400).
				onUpdate(updatestyle).
				easing(TWEEN.Easing.Back.Out).
				start();

		animate();
	});

	////
	
	function updatestyle(){
		element.css('margin-left', style['margin-left'] + 'px');
	}

	function animate(){
		requestAnimationFrame(animate);
		TWEEN.update();
	}

}