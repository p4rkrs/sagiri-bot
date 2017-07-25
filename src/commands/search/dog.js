const { Command } = require('sylphy');
const request = require('superagent');
const htmlToJSON = require('htm-to-json').convert_html_to_json;

class Dog extends Command {
    constructor(...args) {
        super(...args, {
            name: 'dog',
            description: 'Shows a random dog image.',
            group: 'search'
        });
    }

    handle({ msg, client }, responder) {
        const link = 'http://random.dog/';
        request.get(link)
            .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36')
            .end((error, res) => {
                if (error) return responder.error('There was an error, please try again!');
                return htmlToJSON(res.text, (errror, data) => {
                    if (errror) return responder.error('There was an error, please try again!');

                    return client.createMessage(msg.channel.id, {
                        embed: {
                            color: 3447003,
                            author: {
                                name: `${msg.author.tag} (${msg.author.id})`,
                                icon_url: msg.author.displayAvatarURL()
                            },
                            image: { url: link + data.img[0].src }
                        }
                    });
                });
            });
    }
};

module.exports = Dog;