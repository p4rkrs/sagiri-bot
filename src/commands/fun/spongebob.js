const { Command } = require('sylphy');

class SpongeBob extends Command {
    constructor(...args) {
        super(...args, {
            name: 'spongebob',
            description: 'SPONGEBOB MEME.',
            group: 'fun',
            usage: [
                { name: 'text', displayName: 'text', type: 'string', optional: false }
            ]
        });
    }

    handle({ msg, args, client }, responder) {
        const text = args.text.toLowerCase().split('');
        for (let i = 0; i < text.length; i += Math.floor(Math.random() * 4)) text[i] = text[i].toUpperCase();
        return responder.success(`${text.join('')}`);
    }
}

module.exports = SpongeBob;