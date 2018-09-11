# Generador de Números Pseudo aleatorios

## Descripción

Generador de números pseudo-aleatorios donde el usuario pueda elegir el tipo de método para generar.

Parte del proyecto es utilizar una API para que pueda generarse un archivo, ya sea JSON o CSV, mediante una solicitud. En cambio, si se quiere obtener un archivo de Excel con los números, se debe ingresar directamente a la versión web.

## Pendientes

### Front end

* Gráfica en D3
    * La gráfica debe recibir un arreglo como valores a gráficar
    * Debe haber interacción para visualizar los datos

* Agregar formulario donde le usuario pueda decidir, en caso de que decida el tipo de salida Excel, el número de columnas que desea ver en el archivo de salida (por comodidad)

### Back end

* Agregar salida de datos con un archivo de Excel, JSON o CSV
* Para poder usar la librería SheetJS con Node [este es el tutorial](https://github.com/SheetJS/js-xlsx/tree/master/demos/server)
