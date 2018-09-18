'use strict'
let modal = document.getElementById('myModal')
let btn = document.getElementById('btn-generar')
let span = document.getElementsByClassName('close')[0]

let form = document.getElementById('form-variables')
let options = form.elements.options
let cMixto = document.getElementById('cong-mixto')
let cMultiplicativo = document.getElementById('cong-multiplicativo')

let _cAditiva = document.getElementsByClassName('c')

let cAditiva = document.getElementById('inlineCAditiva')
let multiplicador = document.getElementById('inlineMultiplicador')
let semilla = document.getElementById('inlineSemilla')
let modulo = document.getElementById('inlineModulo')



cMixto.onclick = () => { // Cuando se presiona el tipo Congruencial Mixto
    console.log("Se presionó congruencial mixto")
}

cMultiplicativo.onclick = () => { // Cuando se presiona el tipo Congruencial Multiplicativo
    console.log("Se presionó congruencial multiplicativo")
}

btn.onclick = () => {
    // $('#myChart').css({
    //     'height': 400,
    //     'visibility': 'visible'
    // })
    console.log("Se disparó el botón para generar la gráfica")
}

span.onclick = () => {
    modal.style.display = 'none'
}

window.onclick = event => {
    if (event.target == modal) modal.style.display = 'none'
}