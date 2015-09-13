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

