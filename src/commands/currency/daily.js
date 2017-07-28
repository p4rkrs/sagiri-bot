const { Command } = require('sylphy');
const moment = require('moment');

const Currency = require('../../../structures/currency/Currency');
const Daily = require('../../../structures/currency/Daily');
class DailyMoney extends Command {
    constructor(...args) {
        super(...args, {
            name: 'daily',
            description: 'Get your daily ☄',
            group: 'util',
            usage: [
                { name: 'member', displayName: 'member', optional: true, last: true }
            ],
            options: { guildOnly: true }
        })
    }

    async handle({ msg, client, args }, responder) {
        const member = args.member || msg.author;
        const received = await Daily.received(msg.author.id);
        if (received) {
            const nextDaily = await Daily.nextDaily(msg.author.id);
            responder.format('emoji:credit_card').reply(`Your next daily ${Currency.textPlural} is into  ${moment.duration(nextDaily).format('hh [hours] mm [minutes]')}`)
        }
        if (member.id !== msg.author.id) {
            responder.format('emoji:credit_card').reply(`${member.username} received ${Currency.convert(Daily.dailyDonationPayout)} on his account.`)
        }

        await Daily.receive(msg.author.id);
        return responder.format('emoji:credit_card').reply(`You received ${Currency.convert(Daily.dailyDonationPayout)} on your account.`)

    }

}

module.exports = DailyMoney

/* 
responder.format('emoji:credit_card').reply(``)
*/