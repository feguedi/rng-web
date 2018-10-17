'use strict'
let modalDescription = document.getElementById('modalDescription')
let modalChart = document.getElementById('modalChart')
let modalXLSX = document.getElementById('modalOptions')
let btn = document.getElementById('btn-generar')
let form = document.getElementById('form-variables')
let spanOptions = document.getElementsByClassName('close')[0]
let spanXLSX = document.getElementsByClassName('close')[1]

$(document).ready(() => {
    $("#num-col").keydown(e => {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Ctrl/cmd + A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Ctrl/cmd + C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Ctrl/cmd + X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             // home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return
        }
    })
})

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

$('#btn-xlsx-dld').click(e => {
    e.preventDefault()
    let yyyy = current_date()[0]
    let mm = current_date()[1]
    let dd = current_date()[2]
    let hr = current_date()[3]
    let mi = current_date()[4]
    let sg = current_date()[5]
    let e_xlsx = export_xlsx()
    if (e_xlsx != false) {
        saveAs(new Blob([s2ab(e_xlsx)], { type: "application/octet-stream" }),
            `rng-${yyyy}${mm}${dd}${hr}${mi}${sg}.xlsx`)
    }
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

    let responseObject

    $.ajax({
        type: 'GET',
        url: `/data?x=${x}&a=${a}&c=${c}&m=${m}&options=${options}`,
        timeout: 2000,
        beforeSend: xhr => {
            // TODO: Agregar algún elemento en la UI que enseñe al usuario que 
            // se está solicitando la información (un spin, por ejemplo)
            let obj = [x, a, c, m]
            let val = v => {
                if (v !== null && v != 0 && v != '') return true
                else return false
            }

            // Las funciones flecha no tienen manera de
            // manejar los elementos 'this' adecuadamente
            obj.forEach(function(e) {
                if (!val(e)) $(this).parent().addClass('border-danger')
                else $(this).parent().removeClass('border-danger')
            })

            if (xhr.overrideMimeType) xhr.overrideMimeType("application/x-www-form-encoded")
        },
        complete: () => {
            // TODO: Agregar elemento que avise al usuario que el proceso terminó
            // o simplemente limpiar el formulario a donde será enviado la 
            // información
            console.log(`Terminado proceso de AJAX`)
        },
        success: data => {
            if (data !== null || data !== undefined || data != '')
                responseObject = JSON.parse(data)
            else
                responseObject = null
        },
        error: xhr => {
            // TODO: elemento avisando al usuario que hubo un error
            console.log(`error: HTTP status ${ xhr.status }`)
            responseObject = null
        }
    })

    return responseObject
}

const export_xlsx = () => {
    let data, wb, out
    try {
        data = fetch_data()
            // TODO: Agregar como filtro el número de columnas en las que el usuario desea
            // visualizar el archivo final
            // wb = data !== null ? create_file(data) : () => { break; return false; }
        wb = create_file(data)
        out = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    } catch (error) {
        console.log(`export_xlsx: No se pudo agregar datos(fetch_cata())`)
        return false
    }
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