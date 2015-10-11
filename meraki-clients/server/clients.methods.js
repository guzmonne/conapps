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
	App.helpers.verifyDoc(doc, requiredKeys);
	if (doc.phones)
		App.helpers.verifyType(doc.phones, 'Array');
	if (doc.emails)
		App.helpers.verifyType(doc.emails, 'Array');
	if (doc.addresses)
		App.helpers.verifyType(doc.addresses, 'Array');
}

function fixMainValues(doc){
	doc.name     = s.capitalize(doc.name)
	doc.lastName = s.capitalize(doc.lastName);
	doc.company  = doc.company.toUpperCase();
	doc.position = s.capitalize(doc.position);
}

function fixEmailValues(doc){
	if (doc.emails && _.isArray(doc.emails)) {
		App.helpers.validateEmailArray(doc.emails);
		_.forEach(doc.emails, function(email){
			email = email.toLowerCase();
		});
	}
}

function fixAddressesValues(doc){
	if (doc.addresses && _.isArray(doc.addresses)){
		_.forEach(doc.addresses, function(address){
			if (address.street)
				address.street = App.helpers.titelize(address.street);
			if (address.city)
				address.city = App.helpers.titelize(address.city);
			if (address.dep)
				address.dep = App.helpers.titelize(address.dep);
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
		App.helpers.stringSearch(doc, indexedFields);
		if (Meteor.isServer) {
			App.helpers.addCreatedValues(doc);
			return Clients.insert(doc);
		}
	},
	updateClient: function(doc){
		verifyDoc(doc);
		fixUpDoc(doc);
		addFullName(doc);
		App.helpers.stringSearch(doc, indexedFields);
		var id = doc._id;
		delete doc._id;
		if (Meteor.isServer) {
			App.helpers.addUpdatedValues(doc);
			return Clients.update(id, {$set: doc});
		}
	}
});