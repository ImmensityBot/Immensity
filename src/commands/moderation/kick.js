const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.KickMembers],
    perms: [Discord.PermissionsBitField.Flags.KickMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Not given';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return client.errNormal({
    error: "Вы не можете кикнуть модератора",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `🔨・Кик`,
    desc: `Вас кикнули в **${interaction.guild.name}**`,
    fields: [
      {
        name: "👤┆Кикнут пользователем",
        value: interaction.user.tag,
        inline: true
      },
      {
        name: "💬┆Причина",
        value: reason,
        inline: true
      }
    ]
  }, member).then(function () {
    member.kick(reason)
    client.succNormal({
      text: "Указанный пользователь был успешно исключен и получил уведомление!",
      fields: [
        {
          name: "👤┆Кикнутый пользователь",
          value: member.user.tag,
          inline: true
        },
        {
          name: "💬┆Причина",
          value: reason,
          inline: true
        }
      ],
      type: 'editreply'
    }, interaction);
  }).catch(function () {
    member.kick(reason)
    client.succNormal({
      text: "Данный пользователь был успешно исключен, но не получил уведомление!",
      type: 'editreply'
    }, interaction);
  });
}

 