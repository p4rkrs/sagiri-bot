const { Command } = require('sylphy')

class Avatar extends Command {
  constructor (...args) {
    super(...args, {
      name: 'avatar',
      description: 'Get the avatar of a user!',
      group: 'search',
      options: { guildOnly: true }
    })
  }

  handle ({ msg }, responder) {
    const user = msg.mentions[0] || msg.author
    const avatarURL = user.dynamicAvatarURL(gif, 256)
    return responder.format('emoji:paintbrush').send(`Avatar of **${user.username}**\n ${avatarURL}`)
  }
}

module.exports = Avatar
