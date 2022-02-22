import { APIInteraction, InteractionResponseType, InteractionType } from 'discord-api-types/v9';
import { Router } from 'itty-router';
import { reply, verifyRequest } from './util';
import { handleCommand, handleMessageComponent } from './handlers';
import { loadCommands, loadComponents } from './loaders';
import type { Command } from './structs/Command';
import type { Component } from './structs/Component';

import * as commandFiles from './commands';
import * as componentFiles from './components';

const router = Router();
const commands = new Map<string, Command>();
const components = new Map<string, Component>();

loadCommands(commands, commandFiles);
loadComponents(components, componentFiles);

router.post('/interactions', async (req: Request) => {
	if(!await verifyRequest(req)) return new Response("invalid request signature", { "status": 401 });
	const body = (await req.json()) as APIInteraction;

	switch (body.type) {
		case InteractionType.Ping: 
			return reply({}, InteractionResponseType.Pong, 200)
		case InteractionType.ApplicationCommand:
			handleCommand(commands, body);
			break;
		case InteractionType.MessageComponent:
			handleMessageComponent(components, body);
			break;
		default:
			return reply(
				{
					data: {
						content: 'Unknown request.'
					}
				},
				InteractionResponseType.ChannelMessageWithSource,
				400
			);
	}
});
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
