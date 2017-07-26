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
            client.createMessage(`**${user.username}**, you got slapped from **${msg.author.username}**`, {
                file: `https://rra.ram.moe${parsedBody.path}`,
                name: 'slap.gif'
            })
        });
    }
}

module.exports = Slap