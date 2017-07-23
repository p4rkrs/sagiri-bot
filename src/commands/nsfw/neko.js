// http://nekos.life/api/neko

const { Command } = require('sylphy')
const superagent = require('superagent');

class Neko extends Command {
  constructor (...args) {
    super(...args, {
      name: 'neko',
      description: 'Get some Neko-Girls !',
      group: 'nsfw'
    })
  }

  async handle ({ msg, client }, responder) {
	if(!msg.channel.nsfw) return responder.format('emoji::underage').send("The channel need to have `nsfw` prefix.")
	const res = await superagent.get('http://nekos.life/api/neko');
	if(!res) return responder.error().send('No results.')
    return client.createMessage(msg.channel.id, {
		embed: {
			color: 0x875F9A,
		image: { url: `${res.body.neko}`}
		}
	})
  }
}

module.exports = Neko

