const { Command } = require('sylphy')
const request = require('request-promise')

class CatGirls extends Command {
  constructor (...args) {
    super(...args, {
      name: 'catgirls',
      description: 'Shows a random catgirl image !',
      group: 'search'
    })
  }

  async handle ({ msg, client }, responder) {
    const response = await request({
      uri: `http://catgirls.brussell98.tk/api/random`,
      headers: { 'User-Agent': `Sagiri (https://github.com/itskiru/sagiri/)` },
      json: true
    })
    return client.createMessage(msg.channel.id, {
      embed: {
        color: 3447003,
        author: {
          name: `${msg.author.username} (${msg.author.id})`,
          icon_url: msg.author.dynamicAvatarURL()
        },
        image: { url: response.url }
      }
    })
  }
}

module.exports = CatGirls
