const credentials = require('./credentials.js')
const request = require('request')

const climate = function (latitude, longitude) {
    const url = 'https://api.darksky.net/forecast/' +   
        credentials.DARK_SKY_SECRET_KEY + `/${latitude},${longitude}?units=si&lang=es`
    request({ url: url, json: true }, function (error, response) {
        const data = response.body.currently
        const info = {
            day: data.summary,
            temp: data.temperature,
            rain: data.precipProbability,
            time: data.time
        }
        const news = `${info.day}. Actualmente está a ${info.temp}°C. Hay ${info.rain}% de probabilidad de lluvia.`
        console.log(news)
        time(data.time)
    })
}

const city = function (name) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places' + `/${name}.json` + '?access_token=' +
        credentials.MAPBOX_TOKEN
    request({ url: url, json: true }, function (error, response) {
        const data = response.body.features[0]
        console.log(data.place_name)
        climate(data.center[1], data.center[0])
    })
}

const time = function (numTime) {
    console.log(new Date(numTime * 1000).toUTCString())
}

module.exports = {
    climate: climate,
    city: city
}