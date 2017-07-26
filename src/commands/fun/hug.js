const { Command } = require('sylphy');
const hugs = require('../../../assets/hugs.json');

class Hug extends Command {
    constructor(...args) {
        super(...args, {
            name: 'hug',
            description: 'Hugs someone.',
            group: 'fun',
            usage: [
                { name: 'member', displayName: 'member', type: 'member', optional: false }
            ]
        });
    }
    handle({ msg, args, client }, responder) {
        if (user.id === client.user.id) return msg.reply("I don't need friend, not like u :p");
        msg.say(`**${user.username}**, you got a hug from **${msg.author.username}**`, {
            file: `https://media.giphy.com/media/${hugs[Math.floor(Math.random() * hugs.length)]}/giphy.gif`,
            name: 'hug.gif'
        });

    }
}

module.exports = Hug;