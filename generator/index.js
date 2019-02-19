'use strict'
const mixto = require('./mixto')
const multiplicativo = require('./multiplicativo')
const vldt = require('./validator')

const arrays = (...args) => {
    let array = []
    let x = args[0]
    let a = args[1]
    let c = args.length == 4 ? args[2] : null
    let m = args.length == 4 ? args[3] : args[2]
    try {
        for (let i = 0; i < m; ++i) {
            if (c) array.push(Number(mixto(i > 0 ? array[i - 1] : x, a, c, m).toFixed(4)))
            else array.push(Number(multiplicativo(i > 0 ? array[i - 1] : x, a, m).toFixed(4)))
        }
        return array
    } catch (error) {
        console.log(`arrays: Error en el envío de datos al arreglo: ${ error }`)
        return null
    }
}

const semillas = (...args) => {
    let x, a, c, m
    if (args.length == 3) {
        x = args[0]
        a = args[1]
        m = args[2]
    } else if (args.length == 4) {
        x = args[0]
        a = args[1]
        c = args[2]
        m = args[3]
    }
    try {
        let array = []
        for (let i = 0; i < m; ++i) {
            switch (args.length) {
                case 3:
                    array.push(multiplicativo(i > 0 ? array[i - 1] : x, a, m))
                    break
                case 4:
                    array.push(mixto(i > 0 ? array[i - 1] : x, a, c, m))
                    break
                default:
                    break
            }
        }
        return array
    } catch (error) {
        console.log(`semillas: Error en el envío de datos al arreglo: ${ error }`)
        return null
    }
}

const generator = {
    soloMultiplicativo: (x, a, m) => multiplicativo(x, a, m),

    arrayMultiplicativo: (x, a, m) => arrays(x, a, m),

    siguienteSemillaMultiplicativo: (x, a, m) => semillas(x, a, m),

    soloMixto: (x, a, c, m) => mixto(x, a, c, m) / m,

    // TODO: colocar validadores para los valores ingresados
    arrayMixto: (x, a, c, m) => arrays(x, a, c, m),

    siguienteSemillaMixto: (x, a, c, m) => semillas(x, a, c, m)
}

module.exports = generator