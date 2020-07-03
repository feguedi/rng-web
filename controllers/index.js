'use strict'
const fs = require('fs')
const generator = require('../generator')

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

let get_data = (req, res) => {
    let body, metodo

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).render('error', {
                title: 'Error',
                message: 'Ningún valor enviado\n"Bad request"'
            })
        return
    }

    body = req.body
    metodo = body.options

    console.log(`get_data: elementos de req:`)
    Object.keys(req.body).forEach(key => console.log(`\t${ key }:\t\t${ req.body[key] }`))

    switch (metodo) {
        case 'mixto':
            res.json({
                data: generator.arrayMixto(body.x, body.a, body.c, body.m),
            })
            break
        case 'multiplicativo':
            res.json({
                data: generator.arrayMultiplicativo(body.x, body.a, body.m),
            })
            break
        default:
            break
    }
}

let error = (req, res) => {
    res.status(404).render('error', { title: 'Error 404', message: `Error\nURL ${ req.originalUrl } no encontrado` })
}

module.exports = {
    home,
    form_d3,
    form_chartjs,
    get_data,
    error,
    error_50x
}