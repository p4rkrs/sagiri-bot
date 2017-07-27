const { Command } = require('sylphy');
const rp = require('request-promise-native');

class ChuckNorris extends Command {
    constructor(...args) {
        super(...args, {
            name: 'chucknorris',
            aliases: ['cn'],
            description: 'Shows a random joke of Chuck Norris from <http://api.icndb.com/jokes/random/>',
            group: 'search'
        });
    }

    async handle({ msg, client }, responder) {
        try {
            const res = await rp.get('http://api.icndb.com/jokes/random/').then(JSON.parse);
            client.createMessage(msg.channel.id, {
                embed: {
                    color: 0xffff00,
                    description: res.value.joke
                }
            })
        } catch (error) {
            responder.error('There was an error, please try again!');
        }
    }
}

module.exports = ChuckNorris;