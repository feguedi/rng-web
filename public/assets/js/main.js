'use strict'
let modal = document.getElementById('modal')
let btn = document.getElementById('question')
let span = document.getElementsByClassName('close')[0]

let cMixto = document.getElementById('cong-mixto')
let cMultiplicativo = document.getElementById('cong-multiplicativo')

let _cAditiva = document.getElementsByClassName('c')

let cAditiva = document.getElementById('inlineCAditiva')
let multiplicador = document.getElementById('inlineMultiplicador')
let semilla = document.getElementById('inlineSemilla')
let modulo = document.getElementById('inlineModulo')

cMixto.on('click', () => { // Cuando se presiona el tipo Congruencial Mixto
    
})

cMultiplicativo.on('click', ()=> { // Cuando se presiona el tpo Congruencial Multiplicativo
    
})

btn.onclick = () => {
    modal.style.display = 'block'
}

span.onclick = () => {
    modal.style.display = 'none'
}

window.onclick = event => {
    if (event.target == modal) modal.style.display = 'none'
}
