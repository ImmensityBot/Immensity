const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.BanMembers],
    perms: [Discord.PermissionsBitField.Flags.BanMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Not given';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return client.errNormal({
    error: "Вы не можете забанить модератора",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `🔨・Бан`,
    desc: `Вы были забанены с **${interaction.guild.name}**`,
    fields: [
      {
        name: "👤┆Забанен пользователем",
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
    member.ban({ reason: reason })
    client.succNormal({
      text: "Указанный пользователь успешно забанен и получил уведомление!",
      fields: [
        {
          name: "👤┆Забаненный пользователь",
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
    member.ban({ reason: reason })
    client.succNormal({
      text: "Данный пользователь был успешно забанен, но не получил уведомление!",
      type: 'editreply'
    }, interaction);
  });
}