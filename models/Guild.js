const Sequelize = require('sequelize');

const Database = require('../structures/PostgreSQL');

let GuildSettings = Database.db.define('guild', {
	guildID: Sequelize.STRING,
	adFilter: Sequelize.BOOLEAN,
	welcome: {
		type: Sequelize.JSONB(), // eslint-disable-line new-cap
		defaultValue: {}
	},
	leave: {
		type: Sequelize.JSONB(), // eslint-disable-line new-cap
		defaultValue: {}
	},
	selfrole: {
		type: Sequelize.JSONB(), // eslint-disable-line new-cap
		defaultValue: {}
	},
	logs: {
		type: Sequelize.JSONB(), // eslint-disable-line new-cap
		defaultValue: {}
	},
	autorole: {
		type: Sequelize.JSONB(), // eslint-disable-line new-cap
		defaultValue: {}
	},
	filter: {
		type: Sequelize.JSONB(), // eslint-disable-line new-cap
		defaultValue: {}
	},
	slowmode: {
		type: Sequelize.JSONB(), // eslint-disable-line new-cap
		defaultValue: {}
	}
}, {
	indexes: [
		{
			unique: false,
			fields: ['guildID']
		}
	]
});


module.exports = GuildSettings;
