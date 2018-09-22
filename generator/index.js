'use strict'
const mixto = require('./mixto')
const multiplicativo = require('./multiplicativo')
const vldt = require('./validator')

let generator = {
    soloMultiplicativo: (x, a, m) => multiplicativo(x, a, m),

    arrayMultiplicativo: (x, a, m) => {
        let array = []
        for (let i = 0; i < m; i++) {
            array.push(multiplicativo(x, a, m))
            x = array[array.length - 1]
        }
        return array
    },

    soloMixto: (x, a, c, m) => mixto(x, a, c, m) / m,

    arrayMixto: (x, a, c, m) => {
        // TODO: colocar validadores para los valores ingresados
        let array = []
        for (let i = 0; i < m; ++i) {
            array.push(mixto(x, a, c, m) / m)
            x = array[array.length - 1]
        }
        array.forEach((item) => item = Number(item.toFixed(4)))
        return array
    },

    siguienteSemillaMixto: (x, a, c, m) => {
        let array = []
        for (let i = 0; i < m; ++i) {
            array.push(mixto(x, a, c, m))
            x = array[array.length - 1]
        }
        return array
    }
}

module.exports = generator