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
                    color: getRandomColor,
                    description: res.value.joke
                }
            })
        } catch (error) {
            responder.error('There was an error, please try again!');
        }
    }
}

function getRandomColor() {
    var color = '';
    while (color.length < 6) {
        color = Math.floor(Math.random() * 16777215).toString(16);
    }
    return '0x' + color;
}

module.exports = ChuckNorris;