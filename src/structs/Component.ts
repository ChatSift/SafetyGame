import type { APIMessageComponentInteraction } from 'discord-api-types';

export interface Component {
	name: string;
	run: (interaction: APIMessageComponentInteraction, metadata: unknown) => unknown;
}
