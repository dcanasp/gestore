const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-comrpra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    compra.calcularTotal();

    procesarCompraBtn.addEventListener('click', procesarCompra);

}

function procesarCompra(){
    e.preventDefault();

    if(cliente.value === '' || correo.value === ''){
        window.alert('Ingresa todos los campos requeridos');
    }else{
        const cargandoGif = document.querySelector('#cargando');
        cargandoGif.style.display = 'block';
    }
}