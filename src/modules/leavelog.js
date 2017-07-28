const guildSettings = require('../../models/Guild')

module.exports = {
  name: 'guilds:leave',
  events: { guildMemberRemove: 'leave' },
  leave: async(member, client, guild) => {
    const settings = await guildSettings.findOne({ where: { guildID: guild.id } })
    if (!settings) return
    const leave = settings.leave
    const logs = settings.logs
    const bans = await guild.getBans().catch(() => null)

    if (logs && logs.enabled && logs.channel && (logs.fields ? logs.fields.leaves !== false : !logs.fields) && (bans && !bans.has(member.id)) && guild.channels.has(logs.channel)) {
      await client.createMessage(guild.channels.get(logs.channel), {
        embed: {
          color: 0xFF0000,
          timestamp: new Date(),
          description: `📤 ${member.user.username} has left the server`
        }
      })
    }
    if (leave && leave.enabled === true && leave.channel && guild.channels.has(leave.channel)) {
      await guild.channels.get(leave.channel).createMessage(leave.message.replace(/USER/g, member.username))
    }
  }
}
