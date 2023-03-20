const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) return;

    var member = interaction.options.getUser('user');
    var Case = interaction.options.getInteger('case');

    Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
        if (data) {
            var warn = data.Warnings.find(x => x.Case == Case);
            if (!warn) {
                client.errNormal({
                    error: "У этого пользователя нет предупреждений с этим номером кейса!",
                    type: 'editreply'
                }, interaction);
                return;
            }
            data.Warnings.splice(data.Warnings.indexOf(warn), 1);
            data.save();
        }
        else {
            client.errNormal({ 
                error: "У пользователя нету предупреждений!", 
                type: 'editreply'
            }, interaction);
        }
    })

    client.embed({
        title: `🔨・Снятие предупреждения`,
        desc: `Вам сняли предупреждение в **${interaction.guild.name}**`,
        fields: [
            {
                name: "👤┆Модератор",
                value: interaction.user.tag,
                inline: true
            },
        ]
    }, member).catch(() => {})

    client.emit('warnRemove', member, interaction.user)
    client.succNormal({
        text: `Предупреждение пользователя успешно снято`,
        fields: [
            {
                name: "👤┆Пользователь",
                value: `${member}`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction);
}

 