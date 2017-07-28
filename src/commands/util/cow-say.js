const { Command } = require('sylphy')
const { stripIndent } = require('common-tags')

class CowSay extends Command {
  constructor (...args) {
    super(...args, {
      name: 'cowsay',
      description: 'Converts text to cowsay.',
      group: 'util',
      usage: [
                { name: 'text', displayName: 'text', type: 'string', optional: false, last: true }
      ]
    })
  }
  handle ({ msg, client, args }, responder) {
    const text = args.text
    return client.createMessage(msg.channel.id, '```' +
            stripIndent`
 _____________
( ${text} )
 -------------
        o   ^__^
         o  (oo)\_______
            (__)\       )\/
                ||----w |
                ||     ||
            ` + '```'
        )
  }
}

module.exports = CowSay
