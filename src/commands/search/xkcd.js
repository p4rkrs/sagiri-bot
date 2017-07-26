const { Command } = require('sylphy');
const snekfetch = require('snekfetch');

class XKCD extends Command {
    constructor(...args) {
        super(...args, {
            name: 'xkcd',
            description: 'Gets an XKCD Comic, optionally opting for today\'s or a specific number.',
            group: 'search',
            usage: [
                { name: 'query', displayName: 'query', type: 'string', optional: false, last: true }
            ]
        });
    }

    async handle({ msg, args, client }, responder) {
        const type = args.query;
        const current = await snekfetch
            .get('https://xkcd.com/info.0.json');
        if (type === 'today') {
            client.createMessage(msg.channel.id, {
                embed: {
                    title: `${current.body.num} - ${current.body.title}`,
                    url: `https://xkcd.com/${current.body.num}`,
                    image: { url: current.body.img },
                    fields: [{
                        name: 'Alt text',
                        value: current.body.alt
                    }]

                }
            })
        } else if (type === 'random') {
            const random = Math.floor(Math.random() * current.body.num) + 1;
            const { body } = await snekfetch
                .get(`https://xkcd.com/${random}/info.0.json`);
            client.createMessage(msg.channel.id, {
                embed: {
                    title: `${body.num} - ${body.title}`,
                    url: `https://xkcd.com/${body.num}`,
                    image: { url: body.img },
                    fields: [{
                        name: 'Alt text',
                        value: body.alt
                    }]
                }
            })
        } else {
            const choice = parseInt(type, 10);
            if (isNaN(choice) || current.body.num < choice || choice < 1) return responder.error('No results, try again!');
            const { body } = await snekfetch
                .get(`https://xkcd.com/${choice}/info.0.json`);
            client.createMessage(msg.channel.id, {
                embed: {
                    title: `${body.num} - ${body.title}`,
                    url: `https://xkcd.com/${body.num}`,
                    image: { url: body.img },
                    fields: [{
                        name: 'Alt text',
                        value: body.alt
                    }]
                }
            })
        }
    }
}

module.exports = XKCD;