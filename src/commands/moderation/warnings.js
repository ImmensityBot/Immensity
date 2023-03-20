const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) {
        client.errNormal({
            error: "У вас нет необходимых прав для использования этой команды!",
            type: 'editreply'
        }, interaction);
        return;
    }

    const member = interaction.options.getUser('user');


    Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
        if (data) {
            var fields = [];
            data.Warnings.forEach(element => {
                fields.push({
                    name: "Предупреждение **" + element.Case + "**",
                    value: "Причина: " + element.Reason + "\nModerator <@!" + element.Moderator + ">",
                    inline: true
                })
            });
            client.embed({
                title: `${client.emotes.normal.error}・Предупреждения`,
                desc: `Предупреждения пользователя **${member.tag}**`,
                fields: [
                    {
                        name: "Всего",
                        value: `${data.Warnings.length}`,
                    },
                    ...fields
                ],
                type: 'editreply'
            }, interaction)
        }
        else {
            client.embed({
                title: `${client.emotes.normal.error}・Предупреждения`,
                desc: `User ${member.user.tag} не имеет предупреждений!`,
                type: 'editreply'
            }, interaction)
        }
    })
}
