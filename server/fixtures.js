if (Meteor.users.find().count() === 0){
	Accounts.createUser({
		username: 'admin',
		email   : 'gmonne@gmail.com',
		profile : {
			roles     : ['admin'],
			name      : 'Administrator',
			createdBy : 'Meteor.fixture.js',
			createdAt : moment().utc().format()
		}
	});
	Accounts.setPassword(Meteor.users.findOne(), 'admin');
	console.log('Default "admin" account created');
}

if (Clients.find({}).count() === 0){
	Clients.insert({
		company : 'TATA',
		name    : 'Pedro',
		lastName: 'Picapiedra',
		phones  : [
			'099858585',
			'26963201 int 20'
		],
		emails: [
			'ppicapiedra@rockmail.com'
		],
		position: 'Encargado',
		addresses:[
			{
				street: 'Piedralisa 221',
				city: 'Bella Union',
				dep: 'Artigas'
			}
		]
	});
	Clients.insert({
		company : 'INEFOP',
		name    : 'Pablo',
		lastName: 'Marmol',
		phones  : [
			'09699885'
		],
		emails: [
			'pmarmol@rockmail.com',
			'pablo.marmol@inefop.com'
		],
		position: 'Encargado',
		addresses:[
			{
				street: 'Av. Italia 2025',
				city: 'Montevideo',
				dep: 'Montevideo'
			},
			{
				street: 'Bv. Artigas 1251',
				city: 'Montevideo',
				dep: 'Montevideo'
			}
		]
	});
}

if (Estimates.find().count() == 0){
	var user = Meteor.users.findOne({});
	var estimate1 = {
		name        : 'CONATEL - WiFi para oficina',
		description : 'APs para cambiar el WiFi actual. La idea es extenderlo para el resto del edificio',
	};
	var estimate2 = {
		name        : 'INEFOP - WAN sobre Internet',
		description : 'La idea es usar los UTM de CISCO Meraki para armar una WAN sobre Internet a través de conexiones VPN con el sitio central',
	};
	var estimate3 = {
		name        : 'CONATEL - AP para laboratorio',
		description : 'Se necesita agregar un AP para el laboratorio',
	};
	Estimates.insert(_.extend(
		{
			stringSearch      : JSON.stringify(estimate1).toLowerCase(),
			products          : [],
			createdBy         : user._id,
			createdByUsername : user.username
		}, estimate1)
	);
	Estimates.insert(_.extend(
		{
			stringSearch      : JSON.stringify(estimate2).toLowerCase(),
			products          : [],
			createdBy         : user._id,
			createdByUsername : user.username,
		}, estimate2)
	);
	Estimates.insert(_.extend(
		{
			stringSearch      : JSON.stringify(estimate3).toLowerCase(),
			products          : [],
			createdBy         : user._id,
			createdByUsername : user.username,
		}, estimate3)
	);
};

if (MerakiProducts.find().count() === 0){
	var product1 = {
		model        : 'MR32',
		family       : 'MR',
		line         : 'Wireless',
		attributes   : {
			standard   : '802.11ac/n',
			throughput : 1200,
			mimo       : '2x2',
			bluetooth  : true,
			cmx        : true,
		}
	};
	var product2 = {
		model        : 'MX64W',
		family       : 'MX',
		line         : 'Security Appliances',
		attributes   : {
			interfaces: [
				{type: 'GE', ammount: 5},
				{type: 'USB', ammount: 1},
				{type: '802.11ac/n', ammount: 2}
			],
			throughput         : 200,
			vpnThroughput      : 70,
			recommendedClients : 50
		}
	};
	var product3 = {
		model        : 'MS220-24P',
		family       : 'MS',
		line         : 'Switches',
		attributes   : {
			interfaces: [
				{type: 'GE', ammount: 24},
				{type: 'SFP', ammount: 4},
			],
			poe       : true,
			poeBudget : 370
		}
	}
	var user = Meteor.users.findOne({});
	MerakiProducts.insert(_.extend({
		image        : 'https://meraki.cisco.com/img/products/icons/mr32.jpg',
		stringSearch : JSON.stringify(product1).toLowerCase(),
		listPrice    : 199.99,
		partnerPrice : 149.99,
		dealPrice    : 129.99,
		nfrPrice     : 99.99,
	}, product1));
	MerakiProducts.insert(_.extend({
		stringSearch : JSON.stringify(product2).toLowerCase(),
		image        : 'https://meraki.cisco.com/img/products/appliances/overview/models/overview-model-mx64w.jpg',
		listPrice    : 349.99,
		partnerPrice : 319.99,
		dealPrice    : 299.99,
		nfrPrice     : 249.99,
	}, product2));
	MerakiProducts.insert(_.extend({
		stringSearch : JSON.stringify(product3).toLowerCase(),
		image        : 'https://meraki.cisco.com/img/products/icons/ms220-24.jpg',
		listPrice    : 249.99,
		partnerPrice : 229.99,
		dealPrice    : 199.99,
		nfrPrice     : 149.99,
	}, product3));
}
/*
if (Switches.find({}).count() === 0){
	Switches.insert({
		sku             : 'WS-C2960X-24TS',
		brand           : 'CISCO',
		ports           : '24',
		portSpeed       : '1 Gbps',
		uplinkPortType  : 'SFP+',
		uplinkPorts     : '2',
		sfpPorts        : true,
	});
	Switches.insert({
		sku                  : 'WS-C2960XR-24TS',
		ports                : '24',
		brand                : 'CISCO',
		portSpeed            : '1 Gbps',
		uplinkPortType       : 'SFP+',
		uplinkPortSpeed      : '10 Gbps',
		uplinkPorts          : '2',
		sfpPorts             : true,
		sfpPlusPorts         : true,
		sfpPlusPortsUplink   : true,
		secondaryPowerSupply : true,
	});
	Switches.insert({
		sku                  : 'WS-C2960XR-24TS',
		ports                : '24',
		brand                : 'CISCO',
		portSpeed            : '1 Gbps',
		uplinkPortType       : 'SFP',
		uplinkPortSpeed      : '1 Gbps',
		uplinkPorts          : '4',
		sfpPorts             : true,
		secondaryPowerSupply : true,
		poePlus              : true,
		poe                  : true,
	});
	Switches.insert({
		sku             : 'WS-C2960X-24PS',
		ports           : '24',
		brand           : 'CISCO',
		portSpeed       : '1 Gbps',
		uplinkPortType  : 'SFP',
		uplinkPortSpeed : '1 Gbps',
		uplinkPorts     : '4',
		sfpPorts        : true,
		poePlus         : true,
		poe             : true,
	});
	Switches.insert({
		sku             : 'JE009A',
		ports           : '48',
		brand           : 'HP',
		portSpeed       : '1 Gbps',
		uplinkPortType  : 'SFP',
		uplinkPortSpeed : '1 Gbps',
		uplinkPorts     : '2',
		sfpPorts        : true,
	});
	Switches.insert({
		sku             : 'JG536A',
		ports           : '8',
		brand           : 'HP',
		portSpeed       : '100 Mbps',
		uplinkPortType  : 'SFP',
		uplinkPortSpeed : '1 Gbps',
		uplinkPorts     : '2',
		dualPortUplinks : true,
		sfpPorts        : true,
	});
}
*/

