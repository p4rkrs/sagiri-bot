
const { Command } = require('sylphy')
const snekfetch = require('snekfetch');
const { ANIMELIST } = process.env

class Anime extends Command {
  constructor (...args) {
    super(...args, {
      name: 'anime',
      description: 'Search an anime on MAL.',
      group: 'search',
      usage: [
          { name: 'anime', type: 'string', optional: false },
      ]
    })
  }

  async handle ({ msg, client, args }, responder) {
    		const { query } = args;
		try {
			const { text } = await snekfetch.get(`https://${ANIMELIST}@myanimelist.net/api/anime/search.xml`)
				.query({ q: query }); // eslint-disable-line id-length
			const { anime } = await xml.parseStringAsync(text);
			const synopsis = cleanXML(anime.entry[0].synopsis[0].substr(0, 2000));
			client.createMessage(msg.channel.id, {
                embed:{
                    color: 0xff00fa,
                    author: {
                        name: anime.entry[0].title[0],
                        icon_url: anime.entry[0].image[0]
                    },
                    thumbnail: { url: anime.entry[0].image[0] },
                    title: `Alternative Title: ${anime.entry[0].english[0] || 'N/A'}`,
                    url: `https://myanimelist.net/anime/${anime.entry[0].id[0]}`,
                    description: synopsis,
                    fields: [
                        {
                            name: 'Type',
                            value:  `${anime.entry[0].type[0]} - ${anime.entry[0].status[0]}`,
                            inline: true
                        },
                        {
                            name: 'Episodes',
                            value: anime.entry[0].episodes[0],
                            inline: true
                        },
                        {
                            name: 'Status',
                            value: anime.entry[0].status[0],
                            inline: true
                        },
                        {
                            name: 'Score',
                            value: anime.entry[0].score[0],
                            inline: true
                        },
                        {
                            name: 'Link',
                            value:  `https://myanimelist.net/anime/${anime.entry[0].id[0]}`,
                            inline: true
                        }
                    ],
                    footer: { text: `${anime.entry[0].start_date[0]} to ${anime.entry[0].end_date[0]}` }
                    
                }
            })
        }
		catch (err) {
			if (err.message === 'Parse Error') return responder.error().send('No results.');
			else throw err;
		}
  }
}

function cleanXML(string) {
	return string
		.replace(/(<br \/>)/g, '')
		.replace(/(&#039;)/g, '\'')
		.replace(/(&mdash;)/g, '—')
		.replace(/(&#034;|&quot;)/g, '"')
		.replace(/(&#038;)/g, '&')
		.replace(/(\[i\]|\[\/i\])/g, '*');
}

module.exports = Anime