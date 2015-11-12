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
	else if (scope.line === 'Security Appliances')
		label += 'danger'
	else if (scope.line === 'Switches')
		label += 'success'
	else if (scope.line === 'Accesories')
		label += 'warning'
	else 
		label += 'inverse'
	element.addClass(label);
}