// Необходимое
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

// Команда 'ping'
module.exports = {
	data: new SlashCommandBuilder()
		.setName('пинг')
		.setDescription('Показывает пинг'),

	async execute(interaction) {
        const pingEmbed = new EmbedBuilder()
            .setColor("2b2d31")
            .setTitle('Проверка связи');

		pingEmbed.setDescription(
            `🏓 Задержка ${Math.round(interaction.client.ws.ping)} мс`
        );

		return interaction.reply(
            {
                embeds: [pingEmbed]
            }
        );
	}
};