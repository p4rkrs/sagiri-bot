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
            client.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name: `Weather data ${info.location.city} - ${info.location.country}`
                    },
                    footer: { text: `${info.image.title} at ${moment().format('MMMM Do YYYY | HH:mm')}` },
                    thumbnail: { url: info.item.description.slice(19, 561) },
                    color: 0x790097,
                    fields: [{
                            name: '💨 Wind Speed',
                            value: `${info.wind.speed} ${info.units.speed}`,
                            inline: true
                        },
                        {
                            name: '💧 Humidity',
                            value: `${info.atmosphere.humidity}%`,
                            inline: true
                        },
                        {
                            name: '🌅 Sunrise',
                            value: convertime(info.astronomy.sunrise),
                            inline: true
                        },
                        {
                            name: '🌇 Sunset',
                            value: convertime(info.astronomy.sunset),
                            inline: true
                        },
                        {
                            name: '☀️ Today\'s High',
                            value: `${info.item.forecast[0].high} °${info.units.temperature}`,
                            inline: true
                        },
                        {
                            name: '☁️️ Today\'s Low',
                            value: `${info.item.forecast[0].low} °${info.units.temperature}`,
                            inline: true
                        },
                        {
                            name: '🌡️ Temperature',
                            value: `${info.item.condition.temp} °${info.units.temperature}`,
                            inline: true
                        },
                        {
                            name: '🏙️ Condition',
                            value: `${info.item.condition.temp} °${info.units.temperature}`,
                            inline: true
                        }
                    ]
                }
            })
        }).catch(error => {
            console.error(error);
        });
    }
}

module.exports = Weather;