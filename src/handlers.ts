import {
	APIApplicationCommandInteraction,
	APIApplicationCommandInteractionData,
	APIMessageButtonInteractionData,
	APIMessageComponentInteraction,
	InteractionResponseType
} from 'discord-api-types/v9';
import { reply } from './util';
import type { Command } from './structs/Command';
import type { Component } from './structs/Component';

export const handleCommand = async (commands: Map<string, Command>, interaction: APIApplicationCommandInteraction) => {
	const data = interaction.data as APIApplicationCommandInteractionData;
	const command = commands.get(data.name?.toLowerCase() ?? '');
	if (!command)
		return reply(
			{
				data: {
					content: 'Internal error, unrecognized command!',
					flags: 64
				}
			},
			InteractionResponseType.ChannelMessageWithSource,
			400
		);

	try {
		await command.run(interaction);
	} catch (e) {
		console.log(`[CMD-ERR] Execution of command ${command.name} by user ${interaction.user?.id} failed due to: ${(e as Error).message}`);
		return reply(
			{
				data: {
					content: `There was an issue running that command! Please reach out to the developers to report this`,
					flags: 64
				}
			},
			InteractionResponseType.ChannelMessageWithSource,
			500
		);
	}
};

export const handleMessageComponent = async (components: Map<string, Component>, interaction: APIMessageComponentInteraction) => {
	const data = interaction.data as APIMessageButtonInteractionData;
	const [componentId, ...metadata] = data.custom_id.split('::');
	const component = components.get(componentId.toLowerCase() ?? '');
	if (!component)
		return reply(
			{
				data: {
					content: 'Internal error, unrecognized component!',
					flags: 64
				}
			},
			InteractionResponseType.ChannelMessageWithSource,
			400
		);

	try {
		await component.run(interaction, metadata);
	} catch (e) {
		console.log(`[CMPS-ERR] Execution of component ${component.name} by user ${interaction.user?.id} failed due to: ${(e as Error).message}`);
		return reply(
			{
				data: {
					content: `There was an issue running that button! Please reach out to the developers to report this`,
					flags: 64
				}
			},
			InteractionResponseType.ChannelMessageWithSource,
			500
		);
	}
};
