const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) return;

    const member = interaction.options.getUser('user');

    interaction.guild.channels.cache.forEach(async (channel) => {
        if (channel.messages) {
            let messages = await channel.messages.fetch();
            let userMessages = messages.filter((m) => m.author.id === member.id);
            await channel.bulkDelete(userMessages).then(() => {
                client.succNormal({
                    text: `Я успешно удалил сообщения`,
                    fields: [
                        {
                            name: "👤┆Пользователь",
                            value: `${member} (${member.tag})`,
                            inline: true
                        }
                    ],
                    type: 'editreply'
                }, interaction).then(msg => setTimeout(() => {
                    msg.delete()
                }, 5000));
            }).catch(err => { });
        }
    });

    interaction.channel.bulkDelete(amount + 1).then(() => {
        client.succNormal({
            text: `Я успешно удалил сообщения`,
            fields: [
                {
                    name: "💬┆Количество",
                    value: amount,
                    inline: true
                }
            ],
            type: 'editreply'
        }, interaction).then(msg => setTimeout(() => {
            msg.delete()
        }, 5000));
    }).catch(err => {
        client.errNormal({
            error: "Произошла ошибка при попытке удалить сообщения в этом канале!",
            type: 'editreply'
        }, interaction);
    });
}

 