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
            options: { guildOnly: true, modOnly: true }
        });
    }

    async handle({ msg, args, client }, responder) {
        const user = args.member;
        let channel = await client.getDMChannel(msg.mentions[0].id);
        if (user.id === client.id) return msg.delete();
        await responder.format('emoji:info').send(`Did you really want to ban ${user} ?`);
        await client.createMessage(msg.channel.id, {
            embed: {
                author: {
                    name: `${user.username} (${user.id})`,
                    icon_url: user.dynamicAvatarURL()
                },
                fields: [{
                    name: 'Reason',
                    value: args.reason
                }],
                timestamp: new Date()
            }
        });
        const reply = await responder.dialog([{
            prompt: 'Do you want to kick the user? Respond by \`yes\` or \`no\`',
            input: { name: 'response', type: 'string', choices: ['yes', 'no'] }
        }])
        if (reply.response === 'yes') {
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
            return msg.react('👌');
        } else {
            responder.format('emoji:info').send(`Understand, will not ban ${user}`);
        }
    }
}


module.exports = Ban;