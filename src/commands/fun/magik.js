const { Command } = require('sylphy');
const request = require('request');

class Magik extends Command {
    constructor(...args) {
        super(...args, {
            name: 'magik',
            description: 'Apply Magik Effect to an user avatar.',
            group: 'fun'
        });
    }

    async handle({ msg, client }, responder) {
        const user = msg.mentions[0] || msg.author;
        const avatarURL = user.dynamicAvatarURL('png', 512);
        try {
            const data = await snekfetch.get(`https://martmists.com/api/v1/magik?url=${images}`);

            return client.createMessage(msg.channel.id, '', {
                files: data.body,
                name: 'magik.png'
            });
        } catch (err) {
            responder.error('There was an error, please try again!');
        }
    }
}

module.exports = Magik;