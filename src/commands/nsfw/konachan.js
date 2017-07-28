// https://konachan.net/post.json
const snekfetch = require('snekfetch')
const { Command } = require('sylphy')

class Konachan extends Command {
  constructor (...args) {
    super(...args, {
      name: 'konachan',
      description: 'Searches Konachan with optional query !',
      group: 'nsfw',
      usage: [
                { name: 'query', type: 'string', optional: true, last: true }
      ]
    })
  }

  async handle ({ msg, client, args }, responder) {
    if (!msg.channel.nsfw) return responder.format('emoji:underage').send('The channel need to have `nsfw` prefix.')
    const { query } = args
    const { body } = await snekfetch
                .get('https://konachan.net/post.json')
                .query({
                  tags: `${query ? `${query} ` : ''}order:random`,
                  limit: 1
                })
    if (!body.length || !body[0].file_url) return responder.error('No results')

    return client.createMessage(msg.channel.id, {
      embed: {
        color: 0xff0000,
        fields: [{
          name: 'Rating',
          value: body[0].rating,
          inline: true
        },
        {
          name: 'ID',
          value: body[0].id,
          inline: true
        }],
        image: { url: `http:${body[0].file_url}` }
      }
    })
  }
}

module.exports = Konachan
