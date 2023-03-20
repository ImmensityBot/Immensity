const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) return;

    const amount = interaction.options.getNumber('amount');

    if (amount > 100) return client.errNormal({
        error: "Я не могу удалить более 100 сообщений за раз!",
        type: 'editreply'
    }, interaction);

    if (amount < 1) return client.errNormal({
        error: "Я не могу удалить менее 1 сообщения!",
        type: 'editreply'
    }, interaction);

    interaction.channel.bulkDelete(amount + 1).then(() => {
        client.succNormal({
            text: `Я успешно удалил сообщения`,
            fields: [
                {
                    name: "💬┆Количество",
                    value: `${amount}`,
                    inline: true
                }
            ],
            type: 'ephemeraledit'
        }, interaction)
    }).catch(err => {
        client.errNormal({
            error: "Произошла ошибка при попытке удалить сообщения в этом канале!",
            type: 'editreply'
        }, interaction);
    });
}

 