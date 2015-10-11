Meteor.methods({
	createMerakiProduct: createMerakiProduct,
	updateMerakiProduct: updateMerakiProduct,
});

function createMerakiProduct (doc){
	if (!doc) throw new Meteor.Error('missing-doc');
	doc = _.compactObject(doc);
	App.helpers.verifyDoc(doc, requiredKeys);
	App.helpers.stringSearch(doc, indexedFields);
	parseDocValues(doc);
	verifyAttributes(doc);
	if (Meteor.isServer){
		App.helpers.addCreatedValues(doc);
		return MerakiProducts.insert(doc);
	}
}

function updateMerakiProduct (doc){
	if (!doc) throw new Meteor.Error('missing-doc');
	doc = _.compactObject(doc);
	App.helpers.verifyDoc(doc, requiredKeys);
	App.helpers.stringSearch(doc, indexedFields);
	parseDocValues(doc);
	verifyAttributes(doc);
	if (Meteor.isServer){
		var id = doc._id;
		if (!id) {
			throw new Meteor.Error('missing-id');
			delete doc._id;
		}
		App.helpers.addUpdatedValues(doc);
		return MerakiProducts.update(id, {$set: doc});
	}
}

function parseDocValues(doc){
	doc.model        = doc.model.toUpperCase();
	doc.listPrice    = parseFloat(doc.listPrice);
	doc.partnerPrice = parseFloat(doc.partnerPrice);
	doc.dealPrice    = parseFloat(doc.dealPrice);
	doc.nfrPrice     = parseFloat(doc.nfrPrice);
}

function verifyAttributes(doc){
	if (doc.line === 'Wireless')
		verifyWirelessAttributes(doc.attributes);
	if (doc.line === 'Switches')
		verifySwitchesAttributes(doc.attributes);
	if (doc.line === 'Security Appliances')
		verifySecurityAppliancesAttributes(doc.attributes);
	if (doc.line === 'Antennas')
		verifyAntennasAttributes(doc.attributes);
}

function verifyWirelessAttributes(attributes){
	console.log('wireless');
	App.helpers.verifyDoc(attributes, ['standard', 'mimo', 'throughput']);
	attributes.throughput = parseInt(attributes.throughput);
}

function verifySwitchesAttributes(attributes){
	console.log('switches');
	App.helpers.verifyDoc(attributes, ['interfaces']);
	verifyInterfaces(attributes.interfaces);
}

function verifySecurityAppliancesAttributes(attributes){
	console.log('security');
	App.helpers.verifyDoc(attributes, ['interfaces', 'throughput', 'vpnThroughput', 'clients']);
	attributes.throughput    = parseInt(attributes.throughput);
	attributes.vpnThroughput = parseInt(attributes.vpnThroughput);
	attributes.clients       = parseInt(attributes.clients);
	verifyInterfaces(attributes.interfaces);
}

function verifyAntennasAttributes(attributes){
	console.log('antennas');
	App.helpers.verifyDoc(attributes, ['type']);
	if (attributes.gain24)
		attributes.gain24 = parseInt(attributes.gain24);
	if (attributes.gain50)
		attributes.gain50 = parseInt(attributes.gain50);
}

function verifyInterfaces(interfaces){
	if (!_.isArray(interfaces))
		throw new Meteor.Error('interfaces-is-not-an-array');
	_.each(interfaces, function(interface){
		if (!interface.type || !interface.ammount)
			throw new Meteor.Error('missing-interface-arguments');
		interface.ammount = parseInt(interface.ammount);
	});
}

var requiredKeys = [
	'line',
	'family',
	'model',
	'attributes',
	'datasheet',
	'image',
	'listPrice',
	'partnerPrice',
	'dealPrice',
	'nfrPrice',
];

var indexedFields = [
	'line',
	'family',
	'model',
	'attributes',
	'listPrice',
	'partnerPrice',
	'dealPrice',
	'nfrPrice',
];

