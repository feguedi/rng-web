'use strict'
let modalDescription = document.getElementById('modalDescription')
let modalChart = document.getElementById('modalChart')
let modalXLSX = document.getElementById('modalOptions')
let btn = document.getElementById('btn-generar')
let form = document.getElementById('form-variables')
let spanOptions = document.getElementsByClassName('close')[0]
let spanXLSX = document.getElementsByClassName('close')[1]

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
    open_modal(modalChart)
})

$(spanOptions).click(() => {
    console.log(`Click en close-btn`)
    close_modal(modalChart)
})

$(window).click(event => {
    switch (event.target) {
        case modalChart:
            close_modal(modalChart)
            break
        case modalXLSX:
            close_modal(modalXLSX)
            break
        default:
            break
    }
})

$('#btn-xlsx').click(() => {
    console.log(`Click en btn-xlsx`)
    open_modal(modalXLSX)
})

$(spanXLSX).click(() => {
    console.log(`Click en close-btn (xlsx)`)
    close_modal(modalXLSX)
})

$('#btn-xlsx-dld').click(() => {
    let yyyy = current_date()[0]
    let mm = current_date()[1]
    let dd = current_date()[2]
    let hr = current_date()[3]
    let mi = current_date()[4]
    let sg = current_date()[5]
    saveAs(new Blob([s2ab(export_xlsx())], { type: "application/octet-stream" }),
        `rng-${yyyy}${mm}${dd}${hr}${mi}${sg}.xlsx`)
})

let open_modal = elem => {
    elem.style.display = 'block'
}

let close_modal = elem => {
    elem.style.display = 'none'
}

let fetch_data = () => {
    let options = form.elements.options.value
    let x = form.elements.x.value
    let a = form.elements.a.value
    let c = form.elements.c.value
    let m = form.elements.m.value

    return fetch('/data', {
            method: 'POST',
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
            console.log(`Dentro del fetch_data`)
            console.log(`data: ${ data }`)
        })
        .catch(error => console.log(`error: ${ error.message }`))
}

const export_xlsx = () => {
    let wb = create_file(fetch_data())
    let out = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    return out
}

// Función para convertir de binario a octeto
const s2ab = s => {
    let buf = new ArrayBuffer(s.lenght)
    let view = new Uint8Array(buf)
    for (let i = 0; i < s.lenght; ++i) view[i] = s.charCodeAt(i) & 0xFF

    return buf
}

let current_date = () => {
    let today = new Date()
    let sg = today.getSeconds()
    let mi = today.getMinutes()
    let hr = today.getHours()
    let dd = today.getDate()
    let mm = today.getMonth()
    let yyyy = today.getFullYear()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm

    return [yyyy, mm, dd, hr, mi, sg]
}

let create_file = (...args) => {
    let yyyy = current_date()[0]
    let mm = current_date()[1]
    let dd = current_date()[2]
    let wb = XLSX.utils.book_new()
    let data_uniformes = [args[0]]
    let data_semillas = [args[1]]

    let ws_uniformes = XLSX.utils.aoa_to_sheet(data_uniformes)
    let ws_semillas = XLSX.utils.aoa_to_sheet(data_semillas)

    wb.Props = {
        Title: "Random Number Generator",
        Subject: "Numbers",
        Author: "http://rng.gudin.io",
        CreatedDate: new Date(yyyy, mm, dd)
    }

    wb.SheetNames.push("Números Uniformes")
    wb.SheetNames.push("Semillas")

    wb.Sheets["Números Uniformes"] = ws_uniformes
    wb.Sheets["Semillas"] = ws_semillas

    return wb
}