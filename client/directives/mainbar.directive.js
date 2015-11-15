angular.module('conapps').directive('mainbar', mainbar);

function mainbar(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'client/views/mainbar.template.ng.html',
		controller       : controller,
		controllerAs     : 'vm',
		bindToController : true,
		link             : link,
		scope            : {},
	}
}

controller.$inject = [];

function controller(){
	var vm = this;

	vm.style = {'margin-left': '0px'};
}

function link (scope, element, attr){
	var margins = {left: 0};

	var tweenMargins = new TWEEN.Tween(margins);

	/////

	scope.$on('toggle:sidebar', function(e, isVisible){
		tweenMargins.stop();
		
		if (isVisible === true)
			tweenMargins.
				to({left: 180}, 400).
				onUpdate(updateMargins).
				easing(TWEEN.Easing.Back.In).
				start();
		else
			tweenMargins.
				to({left: 0}, 400).
				onUpdate(updateMargins).
				easing(TWEEN.Easing.Back.Out).
				start();
		
		animate();
	});

	/////

	function updateMargins(){
		element.css('margin-left', margins.left + 'px');
	}

	function animate(){
		requestAnimationFrame(animate);
		TWEEN.update();
	}

}

/*
angular.module('conapps').directive('mainbar', [
	function(){
		return {
			restrict    : 'E',
			replace     : true,
			templateUrl : 'client/views/mainbar.template.ng.html',
			controller  : ['$scope', 
				function($scope){
					var self = this;
					self.style = {'margin-left': '0px'};
					$scope.$on('toggle:sidebar', function(events, isVisible){
						self.style = (isVisible === true) ?
							{ 'margin-left': '180px' } :
							{ 'margin-left': '0px' };
					});
				}
			],
			controllerAs: 'mainbar',		
		}
	}
]);
*/