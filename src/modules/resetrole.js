const guildSettings = require('../../models/Guild')

module.exports = {
  name: 'guilds:resetrole',
  events: { guildRoleRemove: 'reset' },
  reset: async(role, guild) => {
    const settings = await guildSettings.findOne({ where: { guildID: guild.id } })
    if (!settings) return
    let flairs = settings.selfrole
    if (flairs && flairs.roles && flairs.roles.includes(role.id)) {
      flairs.roles.splice(flairs.roles.indexOf(role.id), 1)
      settings.selfrole = flairs
      settings.save().catch(console.error)
    }
  }
}
