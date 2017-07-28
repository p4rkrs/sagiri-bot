const { Command } = require('sylphy')

class Bigmoji extends Command {
  constructor (...args) {
    super(...args, {
      name: 'bigmoji',
      description: 'View in big an emoji.',
      group: 'util',
      usage: [
                { name: 'emoji', displayName: 'emoji', type: 'string', optional: false, last: true }
      ]
    })
  }

  handle ({ msg, client, args }, responder) {
    const info = {}
    if (args.emoji.id) {
      if (!args.emoji.id) info.server = 'unknown'
      info.url = `https://cdn.discordapp.com/emojis/${args.emoji.id}.png`
    } else {
      return responder.error('Invalid **custom** emoji')
    }
    return responder.reply(`${info.url}`)
  }
}

module.exports = Bigmoji
