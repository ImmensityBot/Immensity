// Необходимое
const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');

const { token } = require('./configs/config.json');

// Определение инстанции клиента
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.commands = new Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFolders = fs.readdirSync(eventsPath);

// Загрузка ивентов
// Чтение каждой подпапки в директории src/events
for (const folder of eventFolders) {
	const folderPath = path.join(eventsPath, folder);
	
    const eventFiles = fs.readdirSync(folderPath)
      	.filter((file) => file.endsWith(".js"));


	// Чтение каждого файла в каждой подпапке директории src/events
    for (const file of eventFiles) {
		const filePath = path.join(folderPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

// Загрузка команд
// Чтение каждой подпапки в директории src/commands
for (const folder of commandFolders) {
	const folderPath = path.join(commandsPath, folder);
	
    const commandFiles = fs.readdirSync(folderPath)
      	.filter((file) => file.endsWith(".js"));

	// Чтение каждого файла в каждой подпапке директории src/commands
	for (const file of commandFiles) {
		const filePath = path.join(folderPath, file);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
}

// Авторизация бота
client.login(token);