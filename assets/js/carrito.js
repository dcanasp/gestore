class Carrito {

    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo : producto.querySelector('h4').textContent,
            precio : producto.querySelector('.precio span').textContent,
            id : producto.querySelector('a').getAttribute('data-id'),
            cantidad : 1
        }
        this.insertarCarrito( infoProducto );
    }

    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }

    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }else{
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;

    }

    eliminarProductoLocalStorage(productoID){
        let productoLS;
        productoLS = this.obtenerProductosLocalStorage();
        productoLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productoLS.splice(index, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productoLS));
    }

    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
        `;
        listaProductos.appendChild(row);

        });
    }

    vaciarLocalStorage(){
        localStorage.clear();
    }

    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            window.alert('el carrito esta vacio');
        }
        else {
            location.href = "compra.html";
        }
    }

   


}



