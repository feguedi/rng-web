'use strict'
require('./config')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const app = express()
const favicon = require('serve-favicon')
const routes = rquire('./routes').routes
const router = require('./routes').router
    // const port = require('./config')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

routes(app)
    // app.use('/', router)

app.listen(process.env.PORT, () => { console.log(`Escuchando peticiones en el puerto ${ process.env.PORT }`) })