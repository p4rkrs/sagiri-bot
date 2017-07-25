const { Command } = require('sylphy');

class Weather extends Command {
    constructor(...args) {
        super(...args, {
            name: 'weather',
            description: 'Shows weather data for a specified city. You can also specify a country after a comma.',
            group: 'search',
            usage: [
                { name: 'city', displayName: 'city', type: 'string', optional: false, last: true }
            ]
        });
    }

    handle({ msg, args, client }, responder) {
        weather(args.city).then(info => { // eslint-disable-line consistent-return
            if (info === null) return responder.error('No Results')
            const wthEmb = new MessageEmbed();
            wthEmb
                .setAuthor(`Weather data ${info.location.city} - ${info.location.country}`)
                .setFooter(` ${info.image.title} at ${moment().format('MMMM Do YYYY | HH:mm')}`)
                .setThumbnail(info.item.description.slice(19, 56))
                .setColor('#790097')
                .addField('💨 Wind Speed', `${info.wind.speed} ${info.units.speed}`, true)
                .addField('💧 Humidity', `${info.atmosphere.humidity}%`, true)
                .addField('🌅 Sunrise', convertime(info.astronomy.sunrise), true)
                .addField('🌇 Sunset', convertime(info.astronomy.sunset), true)
                .addField('☀️ Today\'s High', `${info.item.forecast[0].high} °${info.units.temperature}`, true)
                .addField('☁️️ Today\'s Low', `${info.item.forecast[0].low} °${info.units.temperature}`, true)
                .addField('🌡️ Temperature', `${info.item.condition.temp} °${info.units.temperature}`, true)
                .addField('🏙️ Condition', info.item.condition.text, true);
            msg.embed(wthEmb);
        }).catch(error => {
            console.error(error);
        });
    }
}

module.exports = Weather;