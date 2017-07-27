const { Command } = require('sylphy');
const { createCanvas, loadImage } = require('canvas');
const snekfetch = require('snekfetch');
const { promisifyAll } = require('tsubaki');
const fs = promisifyAll(require('fs'));
const path = require('path');

class Beautiful extends Command {
    constructor(...args) {
        super(...args, {
            name: 'beautiful',
            description: "That's beautiful.",
            group: 'fun'
        });
    }

    async handle({ msg, client }, responder) {
        const user = msg.mentions[0] || msg.author;
        const avatarURL = user.dynamicAvatarURL('png', 512);
        try {
            const canvas = createCanvas(500, 532);

            const ctx = canvas.getContext('2d');

            const base = await loadImage(path.join(__dirname, '..', '..', '..', 'assets', 'beautiful.png'));

            const { body } = await snekfetch.get(avatarURL);

            const avatar = await loadImage(body);

            ctx.drawImage(base, 0, 0);

            ctx.drawImage(avatar, 341, 35, 117, 135);

            ctx.drawImage(avatar, 343, 301, 117, 135);

            return client.createMessage(msg.channel.id, '', {
                file: canvas.toBuffer(),
                name: 'beautiful.png'
            });
        } catch (err) {
            return responder.error(`An error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}

module.exports = Beautiful;