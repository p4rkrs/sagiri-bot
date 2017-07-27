const { Command } = require('sylphy');
const Jimp = require('jimp');
const GIFEnc = require('gifencoder');

class Triggered extends Command {
    constructor(...args) {
        super(...args, {
            name: 'triggered',
            description: 'Put an avatar on a "Triggered" sign.',
            group: 'fun',
            cooldown: '5'
        });
    }

    async handle({ msg, client }, responder) {
        const options = {
            frames: 8,
            size: 256
        };
        const user = msg.mentions[0] || msg.author;
        const avatarURL = user.dynamicAvatarURL('png', 512);
        let base = new Jimp(options.size, options.size);
        let avatar = await Jimp.read(avatarURL);
        let text = await Jimp.read('./assets/triggered.jpg');

        avatar.resize(320, 320);
        text.scaleToFit(280, 60);

        let frames = [];
        let buffers = [];
        let encoder = new GIFEnc(256, 256);
        let stream = encoder.createReadStream();
        let temp;

        stream.on('data', buffer => buffers.push(buffer));
        stream.on('end', () => client.createMessage(msg.channel.id, '', {
            file: Buffer.concat(buffers),
            name: 'triggered.gif'
        }));

        for (let i = 0; i < options.frames; i++) {
            temp = base.clone();

            if (i === 0) temp.composite(avatar, -16, -16);
            else temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16));


            if (i === 0) temp.composite(text, -10, 200);
            else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12));

            frames.push(temp.bitmap.data);
        }
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(20);
        for (let frame of frames) encoder.addFrame(frame);
        encoder.finish();
    }
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Triggered;