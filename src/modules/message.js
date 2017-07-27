const guildSettings = require('../../structures/Redis');
const Util = require('../../util/Util');
module.exports = {
    name: 'messages:message',
    events: { messageCreate: 'message' },
    message: async(message, client) => {
        if (!message.guild || message.author.bot) return null;

        const mute = await Redis.db.getAsync(`mute${message.guild.id}`).then(JSON.parse);
        if (mute && mute.includes(message.author.id)) return message.delete();

        const inviteFilter = await Redis.db.getAsync(`invitefilter${message.guild.id}`).then(JSON.parse);
        const inviteRegex = /(discord\.gg\/.+|discordapp\.com\/invite\/.+)/i;
        if (message.channel.permissionsOf(client.user.id).has("manageMessages") && inviteFilter && inviteRegex.test(message.content.toLowerCase())) return message.delete().then(() => responder.error('Invites aren\'t allowed here.'));


        const words = await Redis.db.getAsync(`filter${message.guild.id}`).then(JSON.parse);
        const enabled = await Redis.db.getAsync(`filterenabled${message.guild.id}`).then(JSON.parse);
        if (enabled && words) {
            if (message.channel.permissionsOf(client.user.id).has("manageMessages") && Util.hasFilteredWord(words, Util.filterWord(message.content))) {
                message.delete();
            }
        }
        const slowmode = await Redis.db.hgetallAsync(`slowmode${message.guild.id}`);
        if (slowmode && JSON.parse(slowmode.enabled)) {
            const slowuser = await Redis.db.hgetallAsync(`slowuser${message.guild.id}${message.author.id}`) || { tokens: 0, lastUpdate: new Date().getTime() };
            if (new Date().getTime() - slowuser.lastUpdate > slowmode.cooldown * 1000) {
                await Redis.db.del(`slowuser${message.guild.id}${message.author.id}`);
            } else if (slowuser.tokens === slowmode.tokens && message.channel.permissionsOf(client.user.id).has("manageMessages")) {
                message.delete();
            } else {
                const tokens = parseInt(slowuser.tokens);
                await Redis.db.hmsetAsync(`slowuser${message.guild.id}${message.author.id}`, { tokens: tokens + 1 });
            }
        }
    }
}