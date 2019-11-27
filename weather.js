const request = require('request')

if ( process.env.NODE_ENV === 'production') {
    var MAPBOX_TOKEN = process.env.MAPBOX_TOKEN
    var DARK_SKY_SECRET_KEY = process.env.DARK_SKY_SECRET_KEY
} else {
    const credentials = require('./credentials.js')
    var MAPBOX_TOKEN = credentials.MAPBOX_TOKEN
    var DARK_SKY_SECRET_KEY = credentials.DARK_SKY_SECRET_KEY
}

const city = function(city, callback) {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places' + `/${name}.json` + '?access_token=' + MAPBOX_TOKEN

    request({ url, json: true }, function(error, response) {
        if (error) {
            callback (error, undefined)
        } else {
            const data = response.body

            if ( data.features === undefined || data.features.length == 0) {
                callback ('Error: ' + data.message, undefined)
            } else {
                const info = {
                    coordinates: data.features[0].center,
                    city: city
                }
                console.log(info.city + ': ')
                callback (undefined, info)
            }
        }
    })
}

const climate = function(info, callback) {
    const url = 'https://api.darksky.net/forecast/' + DARK_SKY_SECRET_KEY + '/' + info.coordinates[1] + ',' + info.coordinates[0] + '?units=si&lang=es'

    request({ url, json: true }, function(error, response) {
        if (error) {
            callback ('Error: ' + error.Error, undefined)
        } else {
          const data = response.body.currently
          const info = {
              day: data.summary,
              temp: data.temperature,
              rain: data.precipProbability,
              time: data.time
          }
            if ( data.error !== undefined ) {
                callback ('Error: ' + data.error, undefined)
            } else {
                const news = `${info.day}. Actualmente está a ${info.temp}°C. Hay ${info.rain}% de probabilidad de lluvia.`
                console.log(news)
                time(info.time)
                callback (undefined, phrase)
            }
        }
    })
}

const time = function (numTime) {
    console.log(new Date(numTime * 1000).toUTCString())
}

module.exports = {
    city: city,
    climate: climate
}
