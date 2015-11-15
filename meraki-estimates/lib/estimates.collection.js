Estimates = new Mongo.Collection('estimates');

App.addQueryConstructorFunctionality(Estimates);

/*
Estimates.allow({

	insert: function(userId){
		return App.auth.isUser(userId);
	},

	update: function(userId, doc){
		return App.auth.isOwner(userId, doc);
	},

})

Estimates.deny({
	update: function(userId, doc){
		return userId === doc.createdById;
	},
})

Estimates.before.insert( (userId, doc) => {
	// Check doc
	App.helpers.stringSearch(doc, ['name', 'description']);
	// Add fields
	doc.discount  = 0.35;
	doc.years     = 3;
	doc.hwMargin  = 0.25;
	doc.swMargin  = 0.25;
	doc.intCost   = 0.25;
	doc.supMargin = 0.25;
	// Add created data
	App.helpers.addCreatedValues(doc);
});

Estimates.before.update( (userId, doc, fields, modifier) => {

	// Check modifier
});

var Estimate = new SimpleSchema({
	name: {
		type: String
	},
	description: {
		type: String
	},
	products: {
		type: Array
	},
	'something.$': {
		type: Object
	},
	licenses: {
		type: Array
	},
	'something.$': {
		type: Object
	},
	deal: {
		type: Boolean
	},
	discount: {
		type: Number
	},
	customDiscount: {
		type: Boolean
	},
	years: {
		type: Number
	},
	hwMargin: {
		type: Number
	},
	swMargin: {
		type: Number
	},
	intCost: {
		type: Number
	},
	supMargin: {
		type: Number
	},
	createdAt: {
		type: Date,
	},
	updatedAt: {
		type: Date,
	},
	createdById: {
		type: String
	},
	createdByUsername: {
		type: String
	},
	updatedById: {
		type: String
	},
	updatedByUsername: {
		type: String
	},
});

Estimates.attachSchema(Estimate);

*/