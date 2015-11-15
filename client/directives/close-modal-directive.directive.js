angular.module('conapps').directive('closeModalButton', closeModalButton);

function closeModalButton(){
	return {
		restrict         : 'E',
		replace          : true,
		templateUrl      : 'client/views/close-modal-button.template.ng.html',
	}
}