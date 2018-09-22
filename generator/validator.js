'use strict'
let base = n => n > 0

let array = (a = []) => {
    a.forEach((item) => item = base(item))
    return !(a.includes(false))
}

let m = (n, x, a, c) => n > x && n > a && n > c


module.exports = {
    base,
    array,
    m
}