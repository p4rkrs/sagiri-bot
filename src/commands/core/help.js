const { Command } = require('sylphy')

class Help extends Command {
  constructor (...args) {
    super(...args, {
      name: 'help',
      description: 'Pong!',
      group: 'core',
      options: { shouldDisplay: true }
    })
  }

  async handle ({ msg, client }, responder) {
       toSend = [];
    		Object.keys(commands).forEach(cmd=>{
					if (commands[cmd].hasOwnProperty("shouldDisplay")) {
						if (commands[cmd].shouldDisplay) toSend.push("\n" + config.command_prefix + cmd + " " + commands[cmd].usage + "\n\t#" + commands[cmd].desc);
					} else toSend.push("\n" + config.command_prefix + cmd + " " + commands[cmd].usage + "\n\t#" + commands[cmd].desc);
    });
    toSend = toSend.join('');
  }
}

module.exports = Help
