import type { APIApplicationCommandInteraction } from 'discord-api-types';

export interface Command {
	name: string;
	aliases?: string[];
	permissions?: string[];
	run: (interaction: APIApplicationCommandInteraction) => unknown;
}
