const { Command } = require('sylphy')
const superagent = require('superagent');

class Ass extends Command {
  constructor (...args) {
    super(...args, {
      name: 'ass',
      description: 'Get some butts !',
      group: 'nsfw'
    })
  }

  async handle ({ msg, client }, responder) {
	if(!msg.channel.nsfw) return responder.format('emoji::underage').send("The channel need to have `nsfw` prefix.")
	const res = await superagent.get('http://api.obutts.ru/butts/0/1/random');
	if(!res) return responder.error().send('No results.')
    return client.createMessage(msg.channel.id, {
		embed: {
			fields: [{
				name: "Rank",
				value: res.body[0].rank,
				inline: true
			},
		{
			name: "ID",
			value: res.body[0].id,
			inline: true
		}],
		image: { url: `http://media.obutts.ru/${res.body[0].preview}`}
		}
	})
  }
}

module.exports = Ass
