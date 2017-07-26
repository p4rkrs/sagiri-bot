const { Command } = require('sylphy');
const uu = require('url-unshort')();


class UnShorten extends Command {
    constructor(...args) {
        super(...args, {
            name: 'unshorten',
            description: 'UnShort a short URL.',
            group: 'util',
            usage: [
                { name: 'url', displayName: 'url', type: 'string', optional: false }
            ]
        });
    }

    async handle({ msg, args, client }, responder) {
        try {
            await uu.expand(args.url)
                .then(url => {
                    if (url) {
                        responder.success(`Original URL is: ${url}`)
                    } else {
                        responder.error("This url can't be expanded");
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });
        } catch (error) {
            console.log(error, 'error');
        }
    }

}

module.exports = UnShorten;