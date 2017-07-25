const { Command } = require('sylphy');

class Eval extends Command {
    constructor(...args) {
        super(...args, {
            name: 'eval',
            description: 'Execute a javascript code!',
            group: 'core',
            options: { hidden: true, adminOnly: true },
            usage: [
                { name: 'eval', displayName: 'eval', type: 'string', optional: false, last: true }
            ]
        });
    }


    async handle({ msg, args, client }, responder) {
        try {
            var suffix = args.eval;
            var evaled = eval(suffix);

            if (evaled instanceof Object)
                evaled = JSON.stringify(evaled);

            return "```xl\n" + clean(evaled) + "\n```";
        } catch (err) {
            return "`ERROR` ```xl\n" + clean(err) + "\n```";
        }
    }
}

function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    }
}

module.exports = Eval