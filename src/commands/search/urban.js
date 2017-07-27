const { Command } = require('sylphy');
const urban = require('urban');

class Urban extends Command {
    constructor(...args) {
        super(...args, {
            name: 'urban',
            description: 'Searches Urban Dictionary for a word.',
            group: 'search',
            usage: [
                { name: 'word', displayName: 'word', type: 'string', optional: false, last: true }
            ]
        });
    }

    async handle({ msg, args, client }, responder) {
        urban(args.word).first(async(json) => { // eslint-disable-line 
            if (json === undefined) {
                return responder.error('There was an error, please try again!');
            }
            client.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name: `Definition of ${json.word}`,
                        icon_url: 'https://i.imgur.com/miYLsGw.jpg'
                    },
                    color: 0xE86121,
                    description: json.definition,
                    url: json.permalink
                }
            })
        });
    }
}

module.exports = Urban;