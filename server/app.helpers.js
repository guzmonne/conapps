function AppHelpers(){}

AppHelpers.prototype.verifyDoc = function(doc, requiredKeys) {
	this.userIsLoggedIn();
	this.docHasRequiredKeys(doc, requiredKeys);
};

AppHelpers.prototype.userIsLoggedIn = function() {
	if (!Meteor.userId())
    throw new Meteor.Error("not-authorized");
};

AppHelpers.prototype.docHasRequiredKeys = function(doc, requiredKeys) {
  _.forEach(requiredKeys, function(key){
  	if (!_.has(doc, key))
  		throw new Meteor.Error("missing-arguments");
  });
};

appHelpers = new AppHelpers();

console.log(appHelpers);