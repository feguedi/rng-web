'use strict'
const express = require('express')
const router = express.Router()

router.get('/', controllers.home)

router.get('/d3', controllers.form_d3)

router.get('/chart-js', controllers.form_chartjs)

router.get('/data', controllers.get_data)
router.post('/data', controllers.post_data)

let routes = app => {
    const controllers = require('../controllers')

    app.route('/')
        .get(controllers.home)

    app.route('/d3')
        .get(controllers.form_d3)

    app.route('/50x')
        .get(controllers.error_50x)

    app.route('/chart-js')
        .get(controllers.form_chartjs)

    app.route('/data')
        .get(controllers.get_data)
        .post(controllers.post_data)

    app.route('*')
        .get(controllers.error)
}

/*
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
*/

module.exports = {
    routes,
    router
}