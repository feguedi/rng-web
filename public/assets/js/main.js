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
        console.log(`Presionada: ${ e.keyCode }`)
            // retroceso, suprimir, escape y enter
        if ($.inArray(e.keyCode, [46, 8, 27, 13]) !== -1 ||
            // Ctrl/cmd + A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Ctrl/cmd + C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Ctrl/cmd + X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // inicio, fin, izquierda, derecha
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault()
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

$("#btn-json").click(e => {
    saveAs(new JSON)
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
            `rng-${ yyyy }${ mm }${ dd }${ hr }${ mi }${ sg }.xlsx`)
    }
})

const open_modal = elem => {
    elem.style.display = 'block'
}

const close_modal = elem => {
    elem.style.display = 'none'
}

const fetch_data = () => {
    let options = form.elements.options.value
    let x = form.elements.x.value
    let a = form.elements.a.value
    let c = form.elements.c.value
    let m = form.elements.m.value

    let responseObject

    $.ajax({
        type: 'GET',
        url: `/data?x=${ x }&a=${ a }&c=${ c }&m=${ m }&options=${ options }`,
        // timeout: 2000,
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
        },
        complete: data => {
            // TODO: Agregar elemento que avise al usuario que el proceso terminó
            // o simplemente limpiar el formulario a donde será enviado la
            // información
            console.log(`Terminado proceso de AJAX`)
            if (data !== null || data !== undefined || data != '') {
                console.log(`fetch_data: complete (${ JSON.parse(data) })`)
                responseObject = data
            } else {
                console.log(`fetch_data: Fallo en la petición de datos`)
                responseObject = null
            }
        },
        success: () => {
            console.log(`Correcta petición AJAX`)
        },
        error: xhr => {
            // TODO: elemento avisando al usuario que hubo un error
            console.log(`error: HTTP status ${ xhr.status }`)
            responseObject = null
        }
    })

    return responseObject
}

const get_data = () => {
    let options = form.elements.options.value
    let x = form.elements.x.value
    let a = form.elements.a.value
    let c = form.elements.c.value
    let m = form.elements.m.value

    let responseObject

    $.get(`/data?x=${ x }&a=${ a }&c=${ c }&m=${ m }&options=${ options }`)
        .done(() => {
            console.log(`get_data: La petición GET salió correcta`)
        })
        .fail((data, status) => {
            console.log(`get_data: Algo falló en la petición`)
            console.log(`get_data: status (${ status })`)
            responseObject = null
        })
        .always(data => {
            responseObject = data
        })

    return responseObject
}

const export_xlsx = () => {
    let data, wb, out
        // TODO: Agregar como filtro el número de columnas en las que el usuario desea
        // visualizar el archivo final
        // wb = data !== null ? create_file(data) : () => { break; return false; }
    try {
        data = fetch_data()
    } catch (error) {
        console.log(`export_xlsx: No se pudo agregar datos(fetch_data())`)
        console.log(`error: ${ error }`)
        return false
    }
    try {
        wb = create_file(data)
    } catch (error) {
        console.log(`export_xlsx: No se pudo crear el archivo con los datos(create_file(data))`)
        console.log(`error: ${ error }`)
        return false
    }
    try {
        out = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    } catch (error) {
        console.log(`export_xlsx: No se pudo escribir el archivo XLSX`)
        console.log(`error: ${ error }`)
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

const current_date = () => {
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

const create_file = (...args) => {
    let yyyy = current_date()[0]
    let mm = current_date()[1]
    let dd = current_date()[2]
    let num_col, wb, data_uniformes, data_semillas
    try {
        num_col = parseInt($("#num-col").text())
    } catch (error) {
        console.log(`create_file: No se pudo determinar un número de columnas`)
        console.log(`error: ${ error }`)
    }
    try {
        wb = XLSX.utils.book_new()
    } catch (error) {
        console.log(`create_file: No se pudo crear el libro nuevo`)
        console.log(`error: ${ error }`)
    }
    try {
        console.log(`create_file: data_uniformes: ${ args[0] }`)
        data_uniformes = num_col > 0 ? [args[0]] : [orderCol(args[0], num_col)]
    } catch (error) {
        console.log(`create_file: No se pudieron determinar los datos de los números uniformes`)
        console.log(`error: ${ error }`)
    }
    try {
        console.log(`create_file: data_semillas: ${ args[1] }`)
        data_semillas = num_col > 0 ? [args[1]] : [orderCol(args[1], num_col)]
    } catch (error) {
        console.log(`create_file: No se pudieron determinar los datos de las semillas`)
        console.log(`error: ${ error }`)
    }

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

const orderCol = (arr = [], col) => {
    let final = []
    let element = []
    try {
        for (let i = 0; i < arr.lenght; ++i) {
            element.push(arr[i])
            if ((i + 1) % col === 0) {
                final.push(element)
                element = []
            }
        }
    } catch (error) {
        console.log(`orderCol: Error al dividir los elementos según el número de columnas`)
        console.log(`error: ${ error }`)
        return false
    }
    return final
}

const isValid = str => !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str)