const { Command } = require('sylphy');
const { GOOGLE } = proccess.env
var googl = require('goo.gl');
googl.setKey(GOOGLE);
googl.getKey();


class Shorten extends Command {
    constructor(...args) {
        super(...args, {
            name: 'shorten',
            description: 'Short a long URL.',
            group: 'util',
            usage: [
                { name: 'url', displayName: 'url', type: 'string', optional: false }
            ]
        });
    }

    async handle({ msg, args, client }, responder) {
        try {
            await googl.shorten(args.url)
                .then((shortUrl) => {
                    responder.success(`I made you a new short URL: ${shortUrl}`)
                })
                .catch((err) => {
                    console.error(err.message);
                });
        } catch (error) {
            console.log(error, 'error');
        }
    }

}

module.exports = Shorten;