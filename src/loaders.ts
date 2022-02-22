import { Component } from './structs/Component';
import type { Command } from './structs/Command';

export const loadCommands = async (commands: Map<string, Command>, commandFiles: any) => {
	for (const file of commandFiles) {
		console.log(`[CMDS] Loaded command: ${file.basename}`);
		const command = file.default as Command;
		commands.set(command.name.toLowerCase(), command);
	}
};

export const loadComponents = async (components: Map<string, Component>, componentFiles: any) => {
	for (const file of componentFiles) {
		console.log(`[CMDS] Loaded component: ${file.basename}`);
		const component = file.default as Component;
		components.set(component.name.toLowerCase(), component);
	}
};
