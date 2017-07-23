const Sequelize = require(`sequelize`);
const { Logger } = require('sylphy');
const logger = new Logger()

const { DB } = process.env;
const database = new Sequelize(DB, { logging: false });

class Database {
	static get db() {
		return database;
	}

	static start() {
		database.authenticate()
			.then(() => logger.info(`[DB]: Connection to database has been established successfully.`))
			.then(() => logger.info(`[DB]: Synchronizing database...`))
			.then(() => database.sync()
				.then(() => logger.info(`[DB]: Done Synchronizing database!`))
				.catch(error => logger.error(`[DB]: Error synchronizing the database: \n${error}`))
			)
			.catch(error => {
				logger.error(`[DB]: Unable to connect to the database: \n${error}`);
				logger.error(`[DB]: Try reconnecting in 5 seconds...`);
				setTimeout(() => Database.start(), 5000);
			});
	}
}

module.exports = Database;