'use strict'
require('./config')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const app = express()
let generator = require('./generator').generator()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// app.use(express.static(__dirname + '/public'))

app.use((err, req, res, next) => {
    switch (res.status()) {
        case 400:
            res.render('error', {
                message: `No sé qué me mandaste\n${ err }`,
                title: '400'
            })
            break
        case 401:
            res.render('error', {
                message: `No autorizado\n${ err }`,
                title: '401'
            })
            break
        case 403:
            res.render('error', {
                message: `Prohibido\n${ err }`,
                title: '403'
            })
            break
        case 404:
            res.render('error', {
                message: `¿Cómo encontrar lo que no existe?\n${ err }`,
                title: '404'
            })
            break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
            res.render('error', {
                message: `Error del servidor\n${ err }`,
                title: `${ res.status() }`
            })
            break
        default:
            break
    }
})

app.get('/', (req, res) => {
    res.render('layouts/index', { title: 'Random Number Generator' })
})

app.get('/chart-js', (req, res) => {
    res.render('chart', {
        title: 'Gráfica con Chart.js',
        chartjs: true
    })
})

app.get('/d3', (req, res) => {
    res.render('index', {
        title: 'Gráfica con D3',
        d3: true
    })
})

app.post('/d3', (req, res) => {
    let body = req.body
    let metodo = body.metodo

    try {
        switch (metodo) {
            case 'mixto':
                res.json({ array: generator.mixto(body.x, body.a, body.c, body.m) })
                break;
            case 'multiplicativo':
                res.json({ array: generator.multiplicativo(body.x, body.a, body.m) })
                break;
            default:
                break;
        }
    } catch (error) {
        res.status(400).render('error', {
            title: 'Error',
            message: 'Método no encontrado\n¿Seguro que es un método congruencial?'
        })
    }
})

app.get('/data', (req, res) => {
    res.send({ data: [12, 19, 3, 5, 2, 3] })
})

app.listen(process.env.PORT, () => { console.log(`Escuchando peticiones en el puerto ${ process.env.PORT }`) })