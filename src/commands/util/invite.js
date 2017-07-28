const { Command } = require('sylphy');

class Invite extends Command {
    constructor(...args) {
        super(...args, {
            name: 'invite',
            description: 'Get some help.',
            group: 'util'
        })
    }
    handle({ msg, client }, responder) {
        return responder.format('emoji:wrench').send('If you need help, suggest or feedback about something come on the support server: https://discord.gg/XVrGEU7 |You can invite the bot by this link: https://kiru.space/sagiri')
    }
}

module.exports = Invite