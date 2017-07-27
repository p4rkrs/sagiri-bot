const { Command } = require('sylphy');
const request = require('request-promise');
const { stripIndents } = require('common-tags');

class Strawpoll extends Command {
    constructor(...args) {
        super(...args, {
            name: 'strawpoll',
            description: 'Create a strawpoll.',
            group: 'util',
            usage: [
                { name: 'title', displayName: 'title', type: 'string', optional: false },
                { name: 'choice', displayName: 'choices', type: 'string', optional: false, infinite: true }
            ]
        });
    }

    async handle({ msg, args, client }, responder) {
        const title = args.title;
        const options = args.choice;

        if (options.length < 2) return responder.error('please provide 2 or more options.');
        if (options.length > 31) return responder.error('please provide less than 31 options.');

        const response = await request({
            method: 'POST',
            uri: `https://strawpoll.me/api/v2/polls`,
            followAllRedirects: true,
            headers: { 'User-Agent': 'Sagiri v2 (https://github.com/itskiru/sagiri-bot)' },
            body: {
                title: title,
                options: options,
                captcha: true
            },
            json: true
        });

        return responder.success(stripIndents `🗳 **${response.title}**
			<http://strawpoll.me/${response.id}>
		`);
    }
}


module.exports = Strawpoll;