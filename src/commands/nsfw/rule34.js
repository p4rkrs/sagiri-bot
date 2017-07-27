const superagent = require('superagent');
const { Command } = require('sylphy');
const { parseString } = require('xml2js');

class Rule34 extends Command {
    constructor(...args) {
        super(...args, {
            name: 'rule34',
            description: 'Searches on Rule34 !',
            group: 'nsfw',
            usage: [
                { name: 'query', type: 'string', optional: false, last: true }
            ]
        });
    }

    async handle({ msg, client, args }, responder) {
        if (!msg.channel.nsfw) return responder.format('emoji:underage').send('The channel need to have `nsfw` prefix.');
        superagent.get(`http://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${args.query.split(' ').join('+')}`)
            .set('User-Agent', 'Sagiri V2.0')
            .then((res) => {
                parseString(res.text, (error, result) => {
                    if (error) {
                        return responder.error('There was an error parsing to JSON for some reason...');
                    } else if (!result.posts.post) {
                        return responder.error('No results');
                    } else { return responder.success(`http://${result.posts.post[Math.floor(Math.random() * result.posts.post.length)].$.file_url.substring(6)}`); }
                });
            })
            .catch((err) => {
                console.log(err)
                return responder.error('There was an error retrieving posts.');
            });
    }
}

module.exports = Rule34;