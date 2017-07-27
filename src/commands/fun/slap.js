const { Command } = require('sylphy');
const request = require('request');

class Slap extends Command {
    constructor(...args) {
        super(...args, {
            name: 'slap',
            description: 'Slap someone.',
            group: 'fun',
            usage: [
                { name: 'member', displayName: 'member', type: 'member', optional: false }
            ]
        });
    }

    handle({ msg, args, client }, responder) {
        request.get('https://rra.ram.moe/i/r?type=slap', (err, result, body) => {
            if (err) return console.log(err)
            let parsedBody = JSON.parse(body);
            client.createMessage(msg.channel.id, {
                embed: {
                    color: 0xff0000,
                    description: `**test**, you got slapped by  **${msg.author.username}**`,
                    image: { url: `https://rra.ram.moe${parsedBody.path}` }
                }
            })
        })
    }
}

module.exports = Slap