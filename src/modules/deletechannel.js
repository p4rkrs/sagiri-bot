guildSettings = require('../../models/Guild')

module.exports = 
{
  name: 'guilds:deletechanel',
  events: {
    channelDelete: 'chandelete'
  },
  chandelete: async(channel) => {
    if (!channel || (channel && !channel.guild)) return;
	const settings = await guildSettings.findOne({ where: { guildID: channel.guild.id } });
	if (!settings) return;
	if (settings.welcome && settings.welcome.public && settings.welcome.public.channel && settings.welcome.public.channel === channel.id) {
		const welcome = settings.welcome;
		delete welcome.public.channel;
		settings.welcome = welcome;
		await settings.save();
	}
	if (settings.leave && settings.leave && settings.leave.channel && settings.leave.channel === channel.id) {
		const leave = settings.leave;
		delete leave.channel;
		settings.leave = leave;
		await settings.save();
	}

	if (settings.logs && settings.logs.channel === channel.id) {
		const logs = settings.logs;
		delete logs.channel;
		settings.logs = logs;
		await settings.save();
	}
  }
}