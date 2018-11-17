'use strict'
const myChart = document.getElementById('myChart')

const graph = () => {
    fetch('/data')
        .then(res => res.json())
        .then(myJson => {
            console.log(myJson)
            // TODO: Aquí se genera la gráfica
        })
}

module.exports = graph