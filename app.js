const weather = require ('./weather.js')
const express = require ('express')

const app = express ()
const port = process.env.PORT || 1337

app.get ('/weather', function (req, res) {
    res.setHeader ('Acces-Control-Allow-Origin', '*')

	if (!req.query.search) {
		return res.send({
			error: 'Tienes que dar un objeto valido'
    })
  }

	weather.city (req.query.search, function (error, response) {
		if (error) {
			return res.send ({
				error: error
			})
        } else {
            weather.climate (response, function (error, phrase) {
                if (error) {
                    return res.send ({
                        error: error
                    })
                } else {
                    return res.send(news)
                }
            })
        }
	})
})

app.get ('/', function (req, res) {
    res.send ('Weather App Lab 6')
})

app.get ('*', function (req, res) {
    res.send( {
        error: 'Esta ruta no existe'
    })
})

app.listen (port, function () {
    console.log ('Up and running')
})
