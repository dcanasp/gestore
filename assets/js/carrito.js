class Carrito {

    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            // this.leerDatosProducto(producto);

            console.log(producto);
        }
    }
}