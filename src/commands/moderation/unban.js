const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.BanMembers],
    perms: [Discord.PermissionsBitField.Flags.BanMembers]
  }, interaction)

  if (perms == false) return;

  interaction.guild.members.unban(interaction.options.getString('user')).then(async function () {
    var member = await interaction.guild.members.cache.get(interaction.options.getString('user'));
    client.succNormal({
      text: "Указанный пользователь был успешно разбанен!",
      fields: [
        {
          name: "👤┆Пользователь",
          value: member ? member.user.tag : interaction.options.getString('user'),
          inline: true
        }
      ],
      type: 'editreply'
    }, interaction);
  }).catch(function (e) {
    return client.errNormal({
      error: `Я не могу найти пользователя!`,
      type: 'editreply'
    }, interaction);
  });
}

 