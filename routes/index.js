'use strict'
const express = require('express')
const router = express()

router.get('/', (req, res) => {
    res.render('layouts/layout', { title: 'Chido, ¿no?', condition: true, anyArray: [1, 2, 3] })
})

router.get('/chart-js', (req, res) => {
    res.render('index', { data: [12, 19, 3, 5, 2, 3] })
})

module.exports = { router }