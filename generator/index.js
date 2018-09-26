'use strict'
const mixto = require('./mixto')
const multiplicativo = require('./multiplicativo')
const vldt = require('./validator')

let arrays = (...args) => {
    let array = [],
        x, a, c, m
    if (args.length == 4) {
        x = args[0]
        a = args[1]
        c = args[2]
        m = args[3]
    } else if (args.length == 3) {
        x = args[0]
        a = args[1]
        m = args[2]
    }
    try {
        for (let i = 0; i < m; ++i) {
            switch (args.length) {
                case 3:
                    array.push(multiplicativo(x, a, m))
                    break
                case 4:
                    array.push(mixto(x, a, c, m))
                    break
                default:
                    break
            }
            x = array[array.length - 1]
        }
        array.forEach((item) => item = Number(item.toFixed(4)))
        return array
    } catch (error) {
        console.log(`arrays: Error en el envío de datos al arreglo: ${ error }`)
        return null
    }
}

let semillas = (...args) => {
    let array = [],
        x, a, c, m
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
                    array.push(multiplicativo(x, a, m))
                    break
                case 4:
                    array.push(mixto(x, a, c, m))
                    break
                default:
                    break
            }
            x = array[array.length - 1]
        }
        return array
    } catch (error) {
        console.log(`semillas: Error en el envío de datos al arreglo: ${ error }`)
        return null
    }
}

let generator = {
    soloMultiplicativo: (x, a, m) => multiplicativo(x, a, m),

    arrayMultiplicativo: (x, a, m) => arrays(x, a, m),

    siguienteSemillaMultiplicativo: (x, a, m) => semillas(x, a, m),

    soloMixto: (x, a, c, m) => mixto(x, a, c, m) / m,

    // TODO: colocar validadores para los valores ingresados
    arrayMixto: (x, a, c, m) => arrays(x, a, c, m),

    siguienteSemillaMixto: (x, a, c, m) => semillas(x, a, c, m)
}

module.exports = generator