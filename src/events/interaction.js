// Необходимое
const { Events } = require('discord.js');

// Ивент создания команды
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Нет команд с названием ${interaction.commandName}`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`Произошла ошибка при выполнении ${interaction.commandName}`);
			console.error(error);
		}
	},
};