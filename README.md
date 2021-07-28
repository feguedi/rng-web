# Generador de Números Pseudo aleatorios

## Descripción

Generador de números pseudo-aleatorios donde el usuario pueda elegir el tipo de método para generar.

Siguiendo el libro _"Simulación. Un enfoque práctico"_ del autor **Raúl Coss Bú**, donde el autor sugiere dos tipos de métodos congruenciales para poder experimentar en una simulación: congruencial mixto y congruencial multiplicativo.

> Estos números se consideran pseudoaleatorios, porque aunque pasan todas las pruebas estadísticas de aleatoriedad, ellos son de hecho completamente determinísticos.

Parte del proyecto es utilizar una API para que pueda generarse un archivo, ya sea JSON o CSV, mediante una solicitud. En cambio, si se quiere obtener un archivo de Excel con los números, se debe ingresar directamente a la versión web.

## API

El backend funciona a manera de API Rest. Los siguientes son los parámetros necesarios \(utilizando el método HTTP GET\) para que el web service pueda responder adecuadamente:

| Variable | Descripción | Tipo de dato |
| :---: | :--- | :---: |
| x | Semilla | _**número**_ |
| a | Multiplicador | _**número**_ |
| c | Constante aditiva | _**número**_ |
| m | Módulo | _**número**_ |
| options | Método congruencial | _**mixto / multiplicativo**_ |

## Pendientes

### Front end

* Gráfica en D3
  * La gráfica debe recibir un arreglo como valores a gráficar
  * Debe haber interacción para visualizar los datos
* Agregar formulario donde le usuario pueda decidir, en caso de que decida el tipo de salida Excel, el número de columnas que desea ver en el archivo de salida \(por comodidad\)
* Agregar salida de datos con un archivo de Excel, JSON o CSV
* Para poder usar la librería SheetJS con Node [este es el tutorial](https://github.com/SheetJS/js-xlsx/tree/master/demos/server)
* Una vez terminada la interfaz con Handlebars se mudará a ReactJS

### Back end

* Manejar los errores de servidor \(40x y 50x\) ya sea desde ProxyReverse o la aplicación en Node

