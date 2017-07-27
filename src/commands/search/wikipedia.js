const { Command } = require('sylphy');
const snekfetch = require('snekfetch');

class Wikipedia extends Command {
    constructor(...args) {
        super(...args, {
            name: 'wikipedia',
            description: 'Searches Wikipedia for your query.',
            group: 'search',
            usage: [
                { name: 'query', displayName: 'query', type: 'string', optional: false, last: true }
            ]
        });
    }

    async handle({ msg, client, args }, responder) {
        const query = args.query;
        const { body } = await snekfetch
            .get('https://en.wikipedia.org/w/api.php')
            .query({
                action: 'query',
                prop: 'extracts',
                format: 'json',
                titles: query,
                exintro: '',
                explaintext: '',
                redirects: '',
                formatversion: 2
            });
        if (body.query.pages[0].missing) return responder.error('There was an error, please try again!');
        client.createMessage(msg.channel.id, {
            embed: {
                color: 0xE7E7E7,
                title: body.query.pages[0].title,
                description: body.query.pages[0].extract.substr(0, 2000).replace(/[\n]/g, '\n\n')
            }
        })

    }
}