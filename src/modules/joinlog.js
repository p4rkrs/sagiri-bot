const guildSettings = require('../../models/Guild');

module.exports
= {
		name: 'guilds:join',
		events: { guildMemberAdd: 'join' },
		join: async(member, client) => {
      	const settings = await guildSettings.findOne({ where: { guildID: member.guild.id } });
			if (!settings) return;
			const welcome = settings.welcome;
			const logs = settings.logs;
			const joinflairs = settings.joinflairs;

			if (logs && logs.enabled && logs.channel && (logs.fields ? logs.fields.joins !== false : !logs.fields) && member.guild.channels.has(logs.channel)) {
				client.createMessage(member.guild.channels.get(logs.channel.id), {
					embed: {
						color: 0x66ff99,
						footer: {
							icon_url: member.staticAvatarURL,
							text: `User Join (${member.guild.memberCount}) | ${moment(msg.timestamp).format('ddd MMM do, YYYY [at] h:mm A')} `
						},
						description: description
					}
				});
			}

			if (welcome && welcome.enabled === true) {
				if (welcome.pm && welcome.pm.enabled === true && welcome.pm.message && member.guild.channels.has(logs.channel)) await member.send(welcome.pm.message.replace(/\[\]/g, member));

				if (welcome.public && welcome.public.enabled !== false && welcome.public.message) {
					if (welcome.public.channel && member.guild.channels.get(welcome.public.channel)) {
						member.guild.channels.get(welcome.public.channel).createMessage(welcome.public.message.replace(/USER/g, member));
					}
					else { await member.guild.owner.createMessage(`A new member joined in\`${member.guild.name}\`but a valid channel is not set! Please set a valid channel for welcome messages in\`${member.guild.name}\`!`); }
				}
			}

			if (joinflairs && joinflairs.enabled && joinflairs[`${member.bot ? 'bots' : 's'}`]) {
				member.addRole(joinflairs[`${member.bot ? 'bots' : 's'}`].roles);
			}
		}
	};

function description(member) {
	if (Date.now() - member.createdAt <= 86400000) {
		description = `📥⚠ NEW ACCOUNT JOIN ${member.name} has joined the server!\n Creation Date: ${member.createdAt.getTime()}`;
	}
	else { description = `📥 ${member.name} has joined the server!`; }
}
