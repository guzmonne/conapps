var requiredKeys = ['name', 'lastName', 'company'];

var indexedFields = [
	'fullName',
	'company',
	'position',
	'phones',
	'emails',
	'addresses' 
];

function verifyDoc(doc){
	if (!doc) throw new Meteor.Error('empty-doc');
	AppHelpers.verifyDoc(doc, requiredKeys);
	if (doc.phones)
		AppHelpers.verifyType(doc.phones, 'Array');
	if (doc.emails)
		AppHelpers.verifyType(doc.emails, 'Array');
	if (doc.addresses)
		AppHelpers.verifyType(doc.addresses, 'Array');
}

function fixMainValues(doc){
	doc.name     = s.capitalize(doc.name)
	doc.lastName = s.capitalize(doc.lastName);
	doc.company  = doc.company.toUpperCase();
	doc.position = s.capitalize(doc.position);
}

function fixEmailValues(doc){
	if (doc.emails && _.isArray(doc.emails)) {
		AppHelpers.validateEmailArray(doc.emails);
		_.forEach(doc.emails, function(email){
			email = email.toLowerCase();
		});
	}
}

function fixAddressesValues(doc){
	if (doc.addresses && _.isArray(doc.addresses)){
		_.forEach(doc.addresses, function(address){
			if (address.street)
				address.street = AppHelpers.titelize(address.street);
			if (address.city)
				address.city = AppHelpers.titelize(address.city);
			if (address.dep)
				address.dep = AppHelpers.titelize(address.dep);
		});
	}
}

function fixUpDoc(doc){
	verifyDoc(doc);
	fixMainValues(doc);
	fixEmailValues(doc);
	fixAddressesValues(doc);
}

function addFullName(doc){
	doc.fullName = doc.name + ' ' + doc.lastName;
}

Meteor.methods({
	addClient: function(doc){
		verifyDoc(doc);
		fixUpDoc(doc);
		addFullName(doc);
		AppHelpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			AppHelpers.addCreatedValues(doc);
			return Clients.insert(doc);
		}
	},
	updateClient: function(doc){
		verifyDoc(doc);
		fixUpDoc(doc);
		addFullName(doc);
		AppHelpers.stringSearch(doc, indexedFields);
		var id = doc._id;
		delete doc._id;
		if (Meteor.isServer) {
			AppHelpers.addUpdatedValues(doc);
			return Clients.update(id, {$set: doc});
		}
	}
});