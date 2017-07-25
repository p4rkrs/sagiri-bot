const { Command } = require('sylphy');
const superagent = require('superagent');

class Boobs extends Command {
    constructor(...args) {
        super(...args, {
            name: 'boobs',
            description: 'Get some boobs !',
            group: 'nsfw'
        });
    }

    async handle({ msg, client }, responder) {
        if (!msg.channel.nsfw) return responder.format('emoji:underage').send('The channel need to have `nsfw` prefix.');
        const res = await superagent.get('http://api.oboobs.ru/boobs/0/1/random');
        if (!res) return responder.error('No results.');
        return client.createMessage(msg.channel.id, {
            embed: {
                color: 0xff0000,
                fields: [{
                        name: 'Rank',
                        value: res.body[0].rank,
                        inline: true
                    },
                    {
                        name: 'ID',
                        value: res.body[0].id,
                        inline: true
                    }
                ],
                image: { url: `http://media.oboobs.ru/${res.body[0].preview}` }
            }
        });
    }
}

module.exports = Boobs;