'use strict'
require('./config')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const path = require('path')
const favicon = require('serve-favicon')
const routes = require('./routes')
const app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

routes(app)

app.listen(process.env.PORT, () => { console.log(`Escuchando peticiones en el puerto ${ process.env.PORT }`) })