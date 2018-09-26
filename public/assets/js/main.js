'use strict'
let modalDescription = document.getElementById('modalDescription')
let modalChart = document.getElementById('modalChart')
let btn = document.getElementById('btn-generar')
let form = document.getElementById('form-variables')
let span = document.getElementsByClassName('close')[0]

$('#cong-mixto').click(() => {
    $('#cong-mixto').addClass('active')
    $('#cong-multiplicativo').removeClass('active')
    $('.caditiva-label').css({
        'visibility': 'visible',
        'display': 'inline'
    })
})

$('#cong-multiplicativo').click(() => {
    $('#cong-multiplicativo').addClass('active')
    $('#cong-mixto').removeClass('active')
    $('.caditiva-label').css({
        'visibility': 'hidden',
        'display': 'none'
    })
})

$('#btn-generar').click(() => {
    console.log(`Click en btn-generar`)
    open_modal()
})

$(span).click(() => {
    console.log(`Click en close-btn`)
    close_modal()
})

$(window).click(event => {
    if (event.target == modalChart) close_modal()
})

let open_modal = () => {
    modalChart.style.display = 'block'
}

let close_modal = () => {
    modalChart.style.display = 'none'
}

let fetch_data = () => {
    let options = form.elements.options.value
    let x = form.elements.x.value
    let a = form.elements.a.value
    let c = form.elements.c.value
    let m = form.elements.m.value

    // fetch('http://localhost:8080/data', {
    fetch('/data', {
            method: POST,
            body: {
                a,
                x,
                c,
                m,
                options
            },
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(`Dentro del fetch_data`);
            console.log(`data: ${ data }`);
        })
        .catch(error => console.log(`error: ${ error }`))
}