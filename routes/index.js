'use strict'
const express = require('express')
const controllers = require('../controllers')

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

module.exports = routes
