import { Command } from '../structs/Command';

export default {
	name: 'Ping',
	run: (interaction) => {
		return console.log('PING!');
	}
} as Command;
