const { Command } = require('sylphy');
const request = require('request');

class Emojify extends Command {
    constructor(...args) {
        super(...args, {
            name: 'search',
            description: 'Gets emojis based on input.',
            group: 'search',
            usage: [
                { name: 'query', displayName: 'word', type: 'string', optional: false, last: true }
            ]
        });
    }

    handle({ msg, args }, responder) {
        const type = args.query
        var options = {
            uri: `https://emoji.getdango.com/api/emoji?q=${type}`,
            headers: { 'User-Agent': 'Sagiri v1 (https://github.com/itskiru/sagiri-bot)' }
        };
        request(options, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                var emojis = JSON.parse(body);
                var toSend = '';
                for (var i = 0; i < emojis.results.length && i < 8; i++) {
                    toSend += emojis.results[i].text;
                }
                responder.success(toSend);
            }
        });
    }
}
}

module.exports = Emojify;