const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.ModerateMembers],
        perms: [Discord.PermissionsBitField.Flags.ModerateMembers]
    }, interaction);

    if (perms == false) return;

    const user = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
    const time = interaction.options.getNumber('time');
    const reason = interaction.options.getString('reason');

    if (user.isCommunicationDisabled()) return client.errNormal({
        error: `${user} уже имеет таум-аут!`,
        type: 'editreply'
    }, interaction);

    user.timeout(time * 60 * 1000, reason).then(m => {
        client.succNormal({
            text: `${user} успешно выдал тайм-аут **${time} минут**`,
            fields: [
                {
                    name: `💬┆Причина`,
                    value: `${reason}`
                }
            ],
            type: 'editreply'
        }, interaction)
    }).catch(e => {
        client.errNormal({
            error: `Я не могу дать тайм-аут ${user.tag}`,
            type: 'editreply'
        }, interaction);
    })
}

 