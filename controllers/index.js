'use strict'
const fs = require('fs')
const generator = require('../generator')

// let generadorD3 = (req, res) => {
//     let generator = require('../generator')

// }

let createTempFile = () => {

}

let home = (req, res) => {
    res.render('layouts/index', { title: 'Random Number Generator' })
}

let form_d3 = (req, res) => {
    res.render('index', {
        title: 'Random Number Generator - D3',
        d3: true
    })
}

let error_50x = (req, res) => {
    res.render('error', {
        message: `Error del servidor\n${ res.status() }`,
        title: `${ res.status() }`
    })
}

let form_chartjs = (req, res) => {
    res.render('chart', {
        title: 'Random Number Generator - Chart.js',
        chartjs: true
    })
}

let post_data = (req, res) => {
    let body

    try {
        body = req.body
    } catch (error) {
        res.status(400).render('error', {
            title: 'Error',
            message: 'Método no encontrado\n¿Seguro que es un método congruencial?'
        })
    }

    let metodo = body.options

    switch (metodo) {
        case 'mixto':
            res.json({ array: generator.arrayMixto(body.x, body.a, body.c, body.m) })
            break;
        case 'multiplicativo':
            res.json({ array: generator.arrayMultiplicativo(body.x, body.a, body.m) })
            break;
        default:
            break;
    }
}

let get_data = (req, res) => {
    res.send({ data: [12, 19, 3, 5, 2, 3] })
}

let error = (req, res) => {
    res.status(404)
        .send({ url: req.originalUrl + ' no encontrado' })
}

module.exports = {
    home,
    form_d3,
    form_chartjs,
    get_data,
    post_data,
    error,
    error_50x
}