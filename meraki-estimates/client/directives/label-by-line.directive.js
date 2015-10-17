angular.module('conapps').directive('labelByLine', labelByLine);

function labelByLine(){
	return {
		restrict         : 'A',
		replace          : false,
		link             : link,
		scope            : {
			line: '@labelByLine'
		},
	}
}

function link (scope, element, attr){
	var label = 'label label-';
	if (scope.line === 'Wireless')
		label += 'primary'
	if (scope.line === 'Security Appliances')
		label += 'danger'
	if (scope.line === 'Switches')
		label += 'success'
	if (scope.line === 'Accesories')
		label += 'warning'
	element.addClass(label);
}