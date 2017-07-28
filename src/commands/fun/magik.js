const { Command } = require('sylphy')
const snekfetch = require('snekfetch')

class Magik extends Command {
  constructor (...args) {
    super(...args, {
      name: 'magik',
      description: 'Apply Magik Effect to an user avatar.',
      group: 'fun'
    })
  }

  async handle ({ msg, client }, responder) {
    const user = msg.mentions[0] || msg.author
    const avatarURL = user.dynamicAvatarURL('png', 512)
    try {
      const data = await snekfetch.get(`https://martmists.com/api/v1/magik?url=${avatarURL}`)

      return client.createMessage(msg.channel.id, '', {
        file: data.body,
        name: 'magik.png'
      })
    } catch (err) {
      console.log(err)
      responder.error('There was an error, please try again!')
    }
  }
}

module.exports = Magik
