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

$('#cong-mixto').click((e) => {
    $('#cong-mixto').addClass('active')
    $('#cong-multiplicativo').removeClass('active')
    $('.caditiva-label').css({
        'visibility': 'visible',
        'display': 'inline'
    })
})

$('#cong-multiplicativo').click((e) => {
    $('#cong-multiplicativo').addClass('active')
    $('#cong-mixto').removeClass('active')
    $('.caditiva-label').css({
        'visibility': 'hidden',
        'display': 'none'
    })
})

span.onclick = () => {
    modal.style.display = 'none'
}

window.onclick = event => {
    if (event.target == modal) modal.style.display = 'none'
}