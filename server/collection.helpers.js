CollectionHelpers = {};

CollectionHelpers.addCreatedValues = function (doc){
	doc.createdAt         = moment().utc().format();
	doc.createdById       = Meteor.userId();
	doc.createdByUsername = Meteor.user().username;
}

CollectionHelpers.addUpdatedValues = function (doc){
	doc.updatedAt         = moment().utc().format();
	doc.updatedById       = Meteor.userId();
	doc.updatedByUsername = Meteor.user().username;
}