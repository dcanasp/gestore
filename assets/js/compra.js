const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');

cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
}