const { Command } = require('sylphy');

class Kick extends Command {
    constructor(...args) {
        super(...args, {
            name: 'kick',
            group: 'mod',
            description: 'Kick a user.',
            usage: [
                { name: 'member', displayName: 'user', type: 'member', optional: false },
                { name: 'reason', displayName: 'reason', type: 'string', optional: false, last: true }
            ],
            options: { guildOnly: true, modOnly: true }
        });
    }

    async handle({ msg, args, client }, responder) {
        const user = msg.mentions[0];
        console.log(user.id);
        let chanel = await client.getDMChannel(`${user.id}`);
        if (user.id === client.id) return msg.delete();

        await responder.format('emoji:info').send(`Did you really want to kick ${user.username} ?`);
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
        /*
        NEED TO REMAKE THAT PART WITH DIALOGS
        Example: responder.dialog([{ name: 'smth', type: 'string' }], someOptions)
        */
        const reply = await responder.dialog([{
            prompt: 'Do you want to kick the user? Respond by \`yes\` or \`no\`',
            input: { name: 'response', type: 'string', choices: ['yes', 'no'] }
        }])
        if (reply.response === 'yes') {
            try {
                DM.createMessage({
                    embed: {
                        color: 0xf7514c,
                        title: `You were kicked from ${msg.guild.name}`,
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
            await user.kick(args.reason);
            return msg.delete.then()(responder.sucess().send(`Kicked ${user.tag} for \`${args.reason}\` `));
        } else {
            responder.format('emoji:info').send(`Understand, will not kick ${user}`);
        }
    }
}

module.exports = Kick;