// Необходимое для Node.js
const fs = require('node:fs');

// Необходимое для Discord.js
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./configs/config.json');

const commands = [];
// Чтение всех файлов с расширением .js из каталога commands
const commandFolders = fs.readdirSync('./src/commands/');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./src/commands/${folder}`)
      	.filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      	const command = require(`./commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
	}
}

// Подготовка к развёртыванию команд
const rest = new REST({ version: '10' }).setToken(token);

// Развёртывание команд
(async () => {
	try {
		console.log(`Начато обновление ${commands.length} команд (/) бота.`);

		// Метод put используется для полного обновления всех команд на сервере
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Успешно обновлены ${data.length} команд (/) бота.`);
	}
	catch (error) {
		// Логирование всех ошибок в консоли
		console.error(error);
	}
})();

/* Удаление всех команд
 * rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
 *	 .then(() => console.log('Successfully deleted all guild commands.'))
 *	 .catch(console.error);
 */