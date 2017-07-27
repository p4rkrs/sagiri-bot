const { Command } = require('sylphy');
const snekfetch = require('snekfetch');

class Illegal extends Command {
    constructor(...args) {
        super(...args, {
            name: 'illegal',
            description: 'Sagiri is now illegal.',
            group: 'fun',
            usage: [
                { name: 'text', displayName: 'text', type: 'string', optional: false }
            ]
        });
    }
    async handle({ client, args, msg }, responder) {
        const illegal = args.illegal;
        try {
            const data = await snekfetch.get(`https://martmists.com/api/v1/illegal?query=${illegal}`);

            return client.createMessage(msg.channel.id, '', {
                file: data.body,
                name: 'illegal.gif'
            });
        } catch (err) {
            responder.error('There was an error, please try again!');
        }
    }
}

module.exports = Illegal