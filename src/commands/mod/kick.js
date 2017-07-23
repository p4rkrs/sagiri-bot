const { Command } = require('sylphy')

class Kick extends Command {
  constructor (...args) {
    super(...args, {
      name: 'kick',
      group: 'mod',
      description: 'Kick a user.',
      usage: [
        { name: 'member', type: 'member', optional: false },
        { name: 'reason', type: 'string', optional: false }
			],
			botPerms: ['kickMember'],
			permissions: ['kickMember'],
      options: { guildOnly: true }
    })
  }

  async handle ({ msg, args, client }, responder) {
		const user = args.member;
		console.log(args.reason)
		console.log(user)
		console.log(args.member)
		let DM = await client.getDMChannel(args.member.id);
		console.log(args.reason)
		console.log(user)
		console.log(args.member)
		if (user.id === client.id) return msg.delete()
		
		await responder.format('emoji:info').send(`Did you really want to kick ${user} ?`);
		await msg.embed({
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
				return msg.delete.then()( responder.sucess().send(`Kicked ${user.tag} for \`${args.reason}\` `));
			}
			else if (['n', 'no', 'cancel'].includes(co.first().content)) {
			 responder.format('emoji:info').send(`Understand, will not kick ${user}`);
			}
		}).catch(() => responder.error().send('You took too long, aborting.'));
	}
};

module.exports = Kick