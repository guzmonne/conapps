var requiredKeys = ['name', 'lastName', 'company'];

function verifyDoc(doc){
	if (!doc) throw new Meteor.Error('empty-doc');
	appHelpers.verifyDoc(doc, requiredKeys);
	if (doc.phones)
		appHelpers.verifyType(doc.phones, 'Array');
	if (doc.emails)
		appHelpers.verifyType(doc.emails, 'Array');
	if (doc.addresses)
		appHelpers.verifyType(doc.addresses, 'Array');
}

function fixMainValues(doc){
	doc.name     = s.capitalize(doc.name)
	doc.lastName = s.capitalize(doc.lastName);
	doc.company  = doc.company.toUpperCase();
	doc.position = s.capitalize(doc.position);
}

function fixEmailValues(doc){
	if (doc.emails && _.isArray(doc.emails)) {
		appHelpers.validateEmailArray(doc.emails);
		_.forEach(doc.emails, function(email){
			email = email.toLowerCase();
		});
	}
}

function fixAddressesValues(doc){
	if (doc.addresses && _.isArray(doc.addresses)){
		_.forEach(doc.addresses, function(address){
			if (address.street)
				address.street = appHelpers.titelize(address.street);
			if (address.city)
				address.city = appHelpers.titelize(address.city);
			if (address.dep)
				address.dep = appHelpers.titelize(address.dep);
		});
	}
}

function fixUpDoc(doc){
	verifyDoc(doc);
	fixMainValues(doc);
	fixEmailValues(doc);
	fixAddressesValues(doc);
}

function addCreatedValues(doc){
	doc.createdAt         = moment().utc().format();
	doc.createdById       = Meteor.userId();
	doc.createdByUsername = Meteor.user().username;
}

function addUpdatedValues(doc){
	doc.updatedAt         = moment().utc().format();
	doc.updatedById       = Meteor.userId();
	doc.updatedByUsername = Meteor.user().username;
}

Meteor.methods({
	addClient: function(doc){
		verifyDoc(doc);
		fixUpDoc(doc);
		addCreatedValues(doc);
		console.log('saved');
		if (Meteor.isServer)
			return Clients.insert(doc);
	},
	updateClient: function(doc){
		verifyDoc(doc);
		fixUpDoc(doc);
		addUpdatedValues(doc);
		var id = doc._id;
		console.log('updated');
		delete doc._id;
		if (Meteor.isServer)
			return Clients.update(id, {$set: doc});
	}
});