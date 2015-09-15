function AppHelpers(){}

AppHelpers.prototype.verifyDoc = function(doc, requiredKeys) {
	this.userIsLoggedIn();
	this.docHasRequiredKeys(doc, requiredKeys);
};

AppHelpers.prototype.userIsLoggedIn = function() {
	if (!Meteor.userId())
    throw new Meteor.Error('not-authorized', 'Autorización requerida');
};

AppHelpers.prototype.docHasRequiredKeys = function(doc, requiredKeys) {
  _.forEach(requiredKeys, function(key){
  	if (!_.has(doc, key))
  		throw new Meteor.Error('missing-arguments', 'Faltan argumentos.');
  }.bind(this));
};

AppHelpers.prototype.validEmail = function(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};

AppHelpers.prototype.validateEmailArray = function(emailArray) {
	_.forEach(emailArray, function(email){
		if (!this.validEmail(email))
			throw new Meteor.Error('invalid-email', 'Email invalido');
	}.bind(this));
};

AppHelpers.prototype.verifyType = function(value, type) {
	if (!value || !type) return;
	if (type === 'Array'){
		if (!_.isArray(value))
			throw new Meteor.Error('value-not-an-array', 'Error de tipo "Array"');
	}
};

AppHelpers.prototype.titelize = function(string) {
	if (!_.isString(string)) return;
	var words = string.split(' ');
	var array = [];
	for (var i = 0; i < words.length; i++){
		array.push(words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1));
	}
	return array.join(' ');
};

Meteor.startup(function(){
	appHelpers = new AppHelpers();
});