<<<<<<< HEAD
const { Command } = require('sylphy')

class Ping extends Command {
  constructor (...args) {
    super(...args, {
      name: 'ping',
      description: 'Pong!',
      group: 'core',
      options: { hidden: true }
    })
  }

  handle ({ msg }, responder) {
    return responder.format('emoji:info').send('Pong!').then(m =>
      m.edit(`${m.content} - Time taken: **${m.timestamp - msg.timestamp}ms**`)
      .catch(this.logger.error)
    )
  }
}

module.exports = Ping
=======
const { Command } = require('sylphy')

class Ping extends Command {
  constructor (...args) {
    super(...args, {
      name: 'ping',
      description: 'Pong!',
      options: { hidden: true }
    })
  }

  handle ({ msg }, responder) {
    return responder.format('emoji:info').send('Pong!').then(m =>
      m.edit(`${m.content} - Time taken: **${m.timestamp - msg.timestamp}ms**`)
      .catch(this.logger.error)
    )
  }
}

module.exports = Ping
>>>>>>> 176dd740f62358cb51b230ac416d14581fcceef5
