const { Command } = require('sylphy');
const request = require('superagent');

class Cat extends Command {
    constructor(...args) {
        super(...args, {
            name: 'cat',
            description: 'Shows a random cat image.',
            group: 'search'
        });
    }

    handle({ msg, client }, responder) {
        request.get('http://random.cat/meow')
            .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36')
            .end((error, res) => {
                if (error) return responder.error('There was an error, please try again!');

                if (res.body) {
                    return client.createMessage(msg.channel.id, {
                        embed: {
                            color: 3447003,
                            author: {
                                name: `${msg.author.username} (${msg.author.id})`,
                                icon_url: msg.author.dynamicAvatarURL()
                            },
                            image: { url: res.body.file }
                        }
                    });
                }
                return responder.error('There was an error, please try again!');
            });
    }
}

module.exports = Cat;