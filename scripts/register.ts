import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { config } from "tomlenv";
import { join } from "path";
import type { Command } from '../src/structs/Command';
config({
	path: join(__dirname, "..", 'wrangler.toml'),
	environment: "dev"
});
for (const env of ['DISCORD_TOKEN', 'CLIENT_ID']) {
	if (!process.env[env]) {
		console.log(`Missing env variable ${env}. Terminating process.`);
		process.exit(1);
	}
}

import * as commandFiles from '../src/commands';
const commands = transformCommands(commandFiles.default);
const clientId = process.env.CLIENT_ID!;
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
	try {
		console.log('Started refreshing global application (/) commands.');
		await rest.put(Routes.applicationCommands(clientId), { body: commands });
		console.log('Successfully reloaded global application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

function transformCommands(commands: Partial<Command>[]) {
	return commands.map((command) => {
		delete command['run'];
		delete command['aliases'];
		return command;
	});
}
