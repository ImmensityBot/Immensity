// Необходимое
const { Events } = require('discord.js');

// Ивент запуска бота
module.exports = {
	name: Events.ClientReady,
	execute(client) {
		console.log(`Успешный запуск! Авторизован через ${client.user.tag}`);
	},
};