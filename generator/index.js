'use strict'
let mixto = require('./mixto').value
let multiplicativo = require('./multiplicativo').value
const express = require('express')
const app = express()
const request = require('request')
const async = require('async')
    // TODO: arreglar esta clase y convertirla en una función global
    // class Generator {
    //     constructor() {
    //         this.mixto = require('./mixto').value
    //         this.multiplicativo = require('./multiplicativo').value
    //     }

//     arrayMixto(x, a, c, m) {
//         this.x = x
//         this.a = a
//         this.c = c
//         this.m = m
//         let array = []
//         for (let i = 0; i < this.m; ++i) {
//             array.push(this.mixto(this.x, this.a, this.c, this.m) / this.m)
//             this.x = array[array.length - 1]
//         }
//         return array
//     }

//     soloMixto(x, a, c, m) {
//         this.x = x
//         this.a = a
//         this.c = c
//         this.m = m
//         return this.mixto(this.x, this.a, this.c, this.m) / this.m
//     }

//     arrayMultiplicativo(x, a, m) {
//         this.x = x
//         this.a = a
//         this.m = m
//         let array = []
//         for (let i = 0; i < this.m; i++) {
//             array.push(this.multiplicativo(this.x, this.a, this.m))
//             this.x = array[array.length - 1]
//         }
//         return array
//     }

//     soloMultiplicativo(x, a, m) {
//         this.x = x
//         this.a = a
//         this.m = m
//         return this.multiplicativo(this.x, this.a, this.m)
//     }
// }

let generator = () => {

    let soloMultiplicativo = (x, a, m) => {
        this.x = x
        this.a = a
        this.m = m
        return this.multiplicativo(this.x, this.a, this.m)
    }

    let arrayMultiplicativo = (x, a, m) => {
        this.x = x
        this.a = a
        this.m = m
        let array = []
        for (let i = 0; i < this.m; i++) {
            array.push(this.multiplicativo(this.x, this.a, this.m))
            this.x = array[array.length - 1]
        }
        return array
    }

    let soloMixto = (x, a, c, m) => {
        this.x = x
        this.a = a
        this.c = c
        this.m = m
        return this.mixto(this.x, this.a, this.c, this.m) / this.m
    }

    let arrayMixto = (x, a, c, m) => {
        this.x = x
        this.a = a
        this.c = c
        this.m = m
        let array = []
        for (let i = 0; i < this.m; ++i) {
            array.push(this.mixto(this.x, this.a, this.c, this.m) / this.m)
            this.x = array[array.length - 1]
        }
        return array
    }
}

module.exports = generator