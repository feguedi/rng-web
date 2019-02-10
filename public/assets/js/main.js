'use strict'
import { graph } from './graficadorD3.js'
let modalDescription = document.getElementById('modalDescription')
let modalChart = document.getElementById('modalChart')
let modalXLSX = document.getElementById('modalOptions')
let btn = document.getElementById('btn-generar')
let form = document.getElementById('form-variables')
let alerta = document.getElementById('alerta-error')
let spanOptions = document.getElementsByClassName('close')[0]
let spanXLSX = document.getElementsByClassName('close')[1]

let options, x, a, c, m
let yyyy, mm, dd, hr, mi, sg

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

    if (!vals_validator()) open_element(modalChart)
    graph(x, a, c, m, options)
})

$(spanOptions).click(() => {
    console.log(`Click en close-btn`)
    close_element(modalChart)
})

$(window).click(event => {
    switch (event.target) {
        case modalChart:
            close_element(modalChart)
            break
        case modalXLSX:
            close_element(modalXLSX)
            break
        default:
            break
    }
})

$('#btn-xlsx').click(() => {
    console.log(`Click en btn-xlsx`)
    open_element(modalXLSX)
})

$(spanXLSX).click(() => {
    console.log(`Click en close-btn (xlsx)`)
    close_element(modalXLSX)
})

$("#btn-json").click(e => {
    let data = get_data()
    current_date()
    saveAs(new Blob([data], {
            type: "text/plain"
        }),
        `rng-${ yyyy }${ mm }${ dd }${ hr }${ mi }${ sg }.json`)
})

$("#btn-csv").click(e => {
    let data = get_data()
    // TODO: agregar conversor de JSON a CSV
    current_date()
    saveAs(new Blob([data], {
            type: "text/plain"
        }),
        `rng-${ yyyy }${ mm }${ dd }${ hr }${ mi }${ sg }.csv`)
})

$('#btn-xlsx-dld').click(e => {
    e.preventDefault()
    current_date()
    let e_xlsx = export_xlsx()
    if (e_xlsx != false) {
        saveAs(new Blob([s2ab(e_xlsx)], { type: "application/octet-stream" }),
                type: "application/octet-stream"
            }),
            `rng-${ yyyy }${ mm }${ dd }${ hr }${ mi }${ sg }.xlsx`)
    }
})

const open_element = elem => elem.style.display = 'block'

const close_element = elem => elem.style.display = 'none'

const error_val = vals => {
    let pre = ['Valores incorrectos: ', 'Valor incorrecto: ']
    const last_element = (elem, array) => array[array.lenght - 1] === elem
    $(alerta).html(() => `<h4 class="alert-heading">Error</h4>`)
    $(alerta).append(`${ vals.lenght > 1 ? pre[0] : pre[1] }`)
    vals.forEach(elem => {
        $(alerta).append(() => {
            return `${ elem }${ last_element(elem, vals) ? '' : ', ' }`
        })
    })
    open_element(alerta)
    setTimeout(close_element(alerta), 4000)
}

const is_valid = v => v != null || v > 0 || v != "" || v != undefined

const m_is_valid = () => is_valid(m) && m > a && m > x || m > c

const vals_validator = () => {
    set_values()
    let err_obj = []
    let elements = [$('#inlineSemilla'), $('#inlineMultiplicador'), $('#inlineModulo')]

    // elements.forEach(e => {
    //     console.log(`vals_validator: ${ e.attr('id') }: ${ e.attr('name') }`)
    // })

    elements.forEach(e => {
        console.log(`vals_validator: valor de ${ e.attr('placeholder') }: ${ e.val() }`)
        if (is_valid(e.val())) e.removeClass('border-danger')
        else {
            console.log(`vals_validator: valor incorrecto ${ e.val() }`)
            e.addClass('border-danger')
            err_obj.push($(e).attr('placeholder'))
        }
    })

    console.log(`vals_validator: valor de ${ $('#inlineCAditiva').attr('name') }: ${ $('#inlineCAditiva').val() }`)
    if (options === 'mixto' && is_valid(c)) $('#inlineCAditiva').removeClass('border-danger')
    else {
        console.log(`vals_validator: valor incorrecto: ${ c }`)
        $('#inlineCAditiva').addClass('border-danger')
        err_obj.push('Constante aditiva')
    }

    err_obj.forEach(e => console.log(`vals_validator: err_obj: ${ e }`))

    if (err_obj.length > 0) {
        error_val(err_obj)
        return false
    }
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
            }

            obj.forEach(e => {
                let elem = form.elements
                if (val(e)) elem.removeClass('border-danger')
                else {
                    elem.addClass('border-danger')
                    // break
                }
            })
        },
        complete: data => {
            // TODO: Agregar elemento que avise al usuario que el proceso terminó
            // o simplemente limpiar el formulario a donde será enviado la
            // información
            console.log(`fetch_data: Terminado proceso de AJAX`)
            console.log(`fetch_data: data: ${ data }`)
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
    $.ajax({
        url: `/data?x=${ x }&a=${ a }&c=${ c }&m=${ m }&options=${ options }`,
        dataType: 'json',
        beforeSend: xhr => {
            vals_validator()
        },
        success: res => {
            console.log(`get_data: La petición fue correcta`)
            console.log(`get_data: ${ res }`)
            return res
        },
        error: (req, status, err) => {
            console.log(`get_data: Algo falló en la petición`)
            console.log(`get_data: status (${ status })`)
            console.log(`get_data: error (${ err })`)
            return null
        }
    })
}

const export_xlsx = () => {
    let data, wb, out
    // TODO: Agregar como filtro el número de columnas en las que el usuario desea
    // visualizar el archivo final
    // wb = data !== null ? create_file(data) : () => { break; return false; }
    try {
        console.log(`export_xlsx: Enviando petición`)
        data = get_data()
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

const set_values = () => {
    options = form.elements.options.value
    x = form.elements.x.value
    a = form.elements.a.value
    c = form.elements.c.value
    m = form.elements.m.value
}

const current_date = () => {
    let today = new Date()
    sg = today.getSeconds()
    mi = today.getMinutes()
    hr = today.getHours()
    dd = today.getDate()
    mm = today.getMonth()
    yyyy = today.getFullYear()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
}

const create_file = (...args) => {
    let num_col, wb, data_uniformes, data_semillas
    current_date()

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
        data_uniformes = num_col > 0 ? [args[0]] : [order_columns(args[0], num_col)]
    } catch (error) {
        console.log(`create_file: No se pudieron determinar los datos de los números uniformes`)
        console.log(`error: ${ error }`)
    }
    try {
        console.log(`create_file: data_semillas: ${ args[1] }`)
        data_semillas = num_col > 0 ? [args[1]] : [order_columns(args[1], num_col)]
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

const order_columns = (arr = [], col) => {
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
        console.log(`order_columns: Error al dividir los elementos según el número de columnas`)
        console.log(`error: ${ error }`)
        return false
    }
    return final
}

const str_is_valid = str => !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str)