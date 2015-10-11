/**
 * Function constructor for an object with shared methods that help
 * when creating Meteor Methods
 * @return {Function}
 */
function _AppHelpers(){}
/**
 * Helper methods that checks if the user is logged in and 
 * checks to see if the provided doc has all the required
 * keys.
 * @param  {Object} doc          Document to be saved
 * @param  {Array} requiredKeys Required keys list
 * @return {Void}              
 */
_AppHelpers.prototype.verifyDoc = function(doc, requiredKeys) {
	this.userIsLoggedIn();
	this.docHasRequiredKeys(doc, requiredKeys);
};
/**
 * Helper method to check if the user is logged in. If not, throws an
 * error.
 * @return {Void}
 */
_AppHelpers.prototype.userIsLoggedIn = function() {
	if (!Meteor.userId())
    throw new Meteor.Error('not-authorized', 'Autorización requerida');
};
/**
 * Helper method that checks wether the provided doc has all the 
 * required Keys. If not it throws an error.
 * @param  {[type]} doc          [description]
 * @param  {[type]} requiredKeys [description]
 * @return {[type]}              [description]
 */
_AppHelpers.prototype.docHasRequiredKeys = function(doc, requiredKeys) {
  _.forEach(requiredKeys, function(key){
  	if (!_.has(doc, key))
  		throw new Meteor.Error('missing-arguments['+key+']', 'Faltan argumentos.');
  }.bind(this));
};
/**
 * Helper method to check if the provided email has a valid email format
 * @param  {String} email Email to be checked
 * @return {Boolean}       Email format test
 */
_AppHelpers.prototype.validEmail = function(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};
/**
 * Helper method that runs the validEmail() method over a String Array.
 * Throws an error if any of the provided emails has not got the proper
 * format.
 * @param  {String Array} emailArray Email list array
 * @return {Void}            
 */
_AppHelpers.prototype.validateEmailArray = function(emailArray) {
	_.forEach(emailArray, function(email){
		if (!this.validEmail(email))
			throw new Meteor.Error('invalid-email', 'Email invalido');
	}.bind(this));
};
/**
 * Helper method to check the type of a variable.
 * It is basically an encapsulation of an underscore method, that
 * throws a Meteor.Error if it encounters a proble.
 * @param  {[type]} value [description]
 * @param  {[type]} type  [description]
 * @return {[type]}       [description]
 */
_AppHelpers.prototype.verifyType = function(value, type) {
	if (!value || !type) return;
	if (type === 'Array'){
		if (!_.isArray(value))
			throw new Meteor.Error('value-not-an-array', 'Error de tipo "Array"');
	}
};

_AppHelpers.prototype.titelize = function(string) {
	if (!_.isString(string)) return;
	var words = string.split(' ');
	var array = [];
	for (var i = 0; i < words.length; i++){
		array.push(words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1));
	}
	return array.join(' ');
};

_AppHelpers.prototype.addCreatedValues = function (doc){
	doc.createdAt         = moment().utc().format();
	doc.createdById       = Meteor.userId();
	doc.createdByUsername = Meteor.user().username;
}

_AppHelpers.prototype.addUpdatedValues = function (doc){
	doc.updatedAt         = moment().utc().format();
	doc.updatedById       = Meteor.userId();
	doc.updatedByUsername = Meteor.user().username;
}

_AppHelpers.prototype.stringSearch = function(doc, indexedFields){
	var indexedDoc = _.clone(doc);
	if (_.isArray(indexedFields)){
		var thisArguments = indexedFields.unshift(indexedDoc);
		indexedDoc = _.pick.apply(this, indexedFields);
	}
	doc.stringSearch = JSON.stringify(indexedDoc).toLowerCase();
}

_AppHelpers.prototype.stringSearch = function(doc, indexedFields) {
	var indexedDoc = _.clone(doc);
	if (_.isArray(indexedFields)){
		var thisArguments = indexedFields.unshift(indexedDoc);
		indexedDoc = _.pick.apply(this, indexedFields);
	}
	doc.stringSearch = JSON.stringify(indexedDoc).toLowerCase();
};

App.helpers = new _AppHelpers();