<<<<<<< HEAD
const chalk = require('chalk')

module.exports = {
  priority: 5,
  process: container => {
    const { client, msg, commands, logger, isPrivate, isCommand } = container
    if (!isCommand) return Promise.resolve()
    logger.info(
      `${chalk.bold.magenta(
        !isPrivate
        ? msg.channel.guild.name
        : '(in PMs)'
      )} > ${chalk.bold.green(msg.author.username)}: ` +
      `${chalk.bold.blue(msg.cleanContent.replace(/\n/g, ' '))}`
    )

    return Promise.resolve(container)
  }
=======
const chalk = require('chalk')

module.exports = {
  priority: 5,
  process: container => {
    const { client, msg, commands, logger, isPrivate, isCommand } = container
    if (!isCommand) return Promise.resolve()
    logger.info(
      `${chalk.bold.magenta(
        !isPrivate
        ? msg.channel.guild.name
        : '(in PMs)'
      )} > ${chalk.bold.green(msg.author.username)}: ` +
      `${chalk.bold.blue(msg.cleanContent.replace(/\n/g, ' '))}`
    )

    return Promise.resolve(container)
  }
>>>>>>> 176dd740f62358cb51b230ac416d14581fcceef5
}