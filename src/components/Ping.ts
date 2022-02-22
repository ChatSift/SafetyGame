import { Component } from '../structs/Component';

export default {
	name: 'Ping',
	run: (interaction) => {
		return console.log('PING!');
	}
} as Component;
