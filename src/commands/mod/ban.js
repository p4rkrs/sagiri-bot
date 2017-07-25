const { Command } = require('sylphy');

class Ban extends Command {
    constructor(...args) {
        super(...args, {
            name: 'ban',
            group: 'mod',
            description: 'Ban a user.',
            usage: [
                { name: 'member', displayName: 'user', type: 'member', optional: false },
                { name: 'reason', displayName: 'reason', type: 'string', optional: false, last: true }
            ],
            botPerms: ['banMembers'],
            permissions: ['banMembers'],
            options: { guildOnly: true }
        });
    }

    async handle({ msg, args, client }, responder) {
        const user = args.member;
        let channel = await client.getDMChannel(msg.mentions[0].id);
        if (user.id === client.id) return msg.delete();
        await responder.format('emoji:info').send(`Did you really want to ban ${user} ?`);
        await msg.embed({
            author: {
                name: `${user.tag} (${user.id})`,
                icon_url: user.displayAvatarURL()
            },
            fields: [{
                name: 'Reason',
                value: args.reason
            }],
            timestamp: new Date()
        });
        responder.format('emoji:fast_forward').send(`Respond by _y_es or _n_o`);
        msg.channel.awaitMessages(response => ['y', 'yes', 'n', 'no', 'cancel'].includes(response.content) && response.author.id === msg.author.id, {
            max: 1,
            time: 30000
        }).then(async(co) => { // eslint-disable-line consistent-return
            if (['yes', 'y'].includes(co.first().content)) {
                try {
                    DM.createMessage({
                        embed: {
                            color: 0xf7514c,
                            title: `You were banned from ${msg.guild.name}`,
                            fields: [{
                                    name: 'Moderator',
                                    value: msg.author.username,
                                    inline: true
                                },
                                {
                                    name: 'Reason',
                                    value: args.reason,
                                    inline: true
                                }
                            ]
                        }
                    });
                } catch (err) {
                    responder.error(`Failed to send DM to ${user}`);
                }
                await user.ban(7, args.reason);
                return msg.delete.then()(responder.sucess().send(`Banned ${user} for \`${args.reason}\` `));
            } else if (['n', 'no', 'cancel'].includes(co.first().content)) {
                responder.format('emoji:info').send(`Understand, will not ban ${user}`);
            }
        }).catch(() => responder.error('You took too long, aborting.'));
    }
}

module.exports = Ban;