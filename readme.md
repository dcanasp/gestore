
## About The Project

GESTORE

Una tienda virtual, que te permite encontrar los productos tecnologicos de tu preferencia a muy buenos precios, la cual tiene roles de comprador, vendedor, administrador, y persona que solo esta viendo sin compromiso.

porque usar gestore:
* Rapida y eficiente carga de los datos, todo manejado en una DB en AWS 
* La seguridad es nuestra prioridad, asi que los tokens de JWT lo van a hacer real
* Gran facilidad de uso 


### Tecnologias usadas

El backend del proyecto se hizo en TypeScript, mientras que el front se hizo con Bootstrap y HTML5, a continuacion estan las librerias y paquetes que nos permitieron llegar a la creacion de gestore.

* Typescript
* Bootstrap
* Primsa
* Parcel.js
* Chart.js
* jQuery
* JWT
* Express.js

## INICIO

Como usar gestore, hay 2 partes de nuestro proyecto, un front y backend, en la carpeta general esta el front, y en la carpeta back, esta este mismo, deben ser ambos ejecutados al tiempo en distintas terminales.


### Instalacion



1. Clona el repositorio
   ```sh
   git clone https://github.com/dcanasp/gestore.git
   ```
2. Install NPM packages 
    en ambas terminales
   ```sh
   npm install 
   ```
## Usage

Para usar se instancian las 2 terminales una en back y otra en front.
1. para el back:
   ```sh
   npm run tsc
   npm run back
   ```
    el primero compila el ts a js, y el segundo corre el back en js. Al ser un lenguaje interpretado (y como no estamos usando una herramienta similar a nodeimon), cada vez se que haga un cambio toca repetir este proceso
2. para el front:
    ```sh
   npm run front
   ```

## Contact

David Cañas - dcanasp@unal.edu.co

Project Link: [https://github.com/dcanasp/gestore.git](https://github.com/dcanasp/gestore.git)
