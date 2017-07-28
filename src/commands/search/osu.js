const { Command } = require('sylphy')
const snekfetch = require('snekfetch')

class Osu extends Command {
  constructor (...args) {
    super(...args, {
      name: 'osu',
      description: 'Pong!',
      group: 'search',
      usage: [
                { name: 'query', displayName: 'username', type: 'string', optional: false, last: true }
      ]
    })
  }

  async handle ({ msg, client, args }, responder) {
    const query = args.query
    try {
      const data = await snekfetch.get(`http://lemmmy.pw/osusig/sig.php?colour=hexff66aa&uname=${query}&pp=2&countryrank&darktriangles&onlineindicator=undefined&xpbar&xpbarhex`)

      return client.createMessage(msg.channel.id, {
        file: data.body,
        name: 'sig.png'
      })
    } catch (err) {
      responder.error('There was an error, please try again!')
    }
  }
}
module.exports = Osu
