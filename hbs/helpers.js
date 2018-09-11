'use strict'
const hbs = require('hbs')

hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear()
})