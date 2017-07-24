const { Command } = require('sylphy')

class Kick extends Command {
  constructor (...args) {
    super(...args, {
      name: 'kick',
      group: 'mod',
      description: 'Kick a user.',
      usage: [
        { name: 'member', displayName: 'user', type: 'member', optional: false },
        { name: 'reason', displayName: 'reason', type: 'string', optional: false, last: true }
			],
			botPerms: ['kickMembers'],
			permissions: ['kickMembers'],
      options: { guildOnly: true }
    })
  }

  async handle ({ msg, args, client }, responder) {
		const user = args.member
		let chanel = await client.getDMChannel(args.member.id);
		if (user.id === client.id) return msg.delete()
		
		await responder.format('emoji:info').send(`Did you really want to kick ${user} ?`);
		await client.createMessage(msg.channel.id, {
			embed: {
			author: {
				name: `${user.tag} (${user.id})`,
				icon_url: user.displayAvatarURL()
			},
			fields: [
				{
					name: 'Reason',
					value: args.reason
				}
			],
			timestamp: new Date()
		}
		});
		responder.format('emoji:fast_forward').send(`Respond by \`yes\` or \`no\``);
		/*
		NEED TO REMAKE THAT PART WITH DIALOGS
		Example: responder.dialog([{ name: 'smth', type: 'string' }], someOptions)
		*/
		responder.dialog([{ name: 'yes', type: 'string' }, { name: 'no', type: 'string'}])
			if (['yes'].includes(responder().dialog.content)) {
				try {
					chanel.createMessage({
            embed: {
              color: 0xf7514c,
              title: `You were kicked from ${msg.guild.name}`,
              fields:[
                {
                  name: "Moderator",
                  value: msg.author.username,
                  inline: true
                },
                {
                  name: "Reason",
                  value: args.reason,
                  inline: true
                }
              ]
            }
          })
				}
				catch (err) {
					responder.error().send(`Failed to send DM to ${user}`);
				}
				await user.kick(args.reason)
				return msg.delete.then()(responder.sucess().send(`Kicked ${user.tag} for \`${args.reason}\` `));
			}
			else {
			 responder.format('emoji:info').send(`Understand, will not kick ${user}`);
			}
		}
	}

module.exports = Kick