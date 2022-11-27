// const compra = new Carrito();
// const listaCompra = document.getElementById('lista-compra tbody');
// const carrito = document.getElementById('carrito');
// const procesarCompraBtn = document.getElementById('procesar-pedido');
// const cliente = document.getElementById('cliente');
// const correo = document.getElementById('correo');

// cargarEventos();

// function cargarEventos(){
//     document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

//     compra.calcularTotal();

//     procesarCompraBtn.addEventListener('click', procesarCompra);

// }

// function procesarCompra(){
//     e.preventDefault();

//     if(cliente.value === '' || correo.value === ''){
//         window.alert('Ingresa todos los campos requeridos');
//     }else{
//         const cargandoGif = document.getElementById('cargando');
//         cargandoGif.style.display = 'block';
//     }

    
// }
const getImages = async (product) => {
    let url = 'http://localhost:3000/getImages/' + product.image_id;
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        }).then(response => response.text()).then(data => datos=data);
    return datos;
}
 function eliminarDupe(carritou){
    let x = new Set()
    carritou.forEach(e => {
        flag = false;
        cantidad = e.quantity;
        x.forEach(l => {
        
        if (e.product_id == l.product_id){
            flag = true;
            l.quantity = Number(cantidad) + Number(l.quantity);
            return;
            
        }
        });

        if (!flag){
            x.add(e);
        }

    });
    return x;


 }

const carritouw=async()=>{
    let carritou = new Set()
    let x = localStorage.getItem("carrito").split("+")
    x.forEach(e => {
        let y = e.split("/")
        let r = {"product_id": y[0], "quantity": y[1]}
        carritou.add(r)  
    })
    console.log(carritou);
    carritou = eliminarDupe(carritou)
    let sum = 0;
    let cantidad = 0;
    carritou.forEach(async (product) => {
        let url = 'http://localhost:3000/getProduct/'+product.product_id;
        let datos;
        const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
      }).then(response => response.json()).then(data => datos=data);
        cantidad = product.quantity;
        sum = sum + datos.precio * cantidad;
        let padre = document.getElementById("carritou");
        let texto = creacion(datos, cantidad);
        // padre.innerHTML = padre.innerHTML + texto;
        padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
        padre.parentNode.insertBefore(padre, padre);
        let padre1 = document.getElementById("subtotal");
        // padre.innerHTML = padre.innerHTML + texto;
        padre1.innerHTML = String(sum);// por si lo quiero alrevez
        padre1.parentNode.insertBefore(padre1, padre1);
        let padre2 = document.getElementById("igv");
        // padre.innerHTML = padre.innerHTML + texto;
        padre2.innerHTML = String(sum * 19/100);// por si lo quiero alrevez
        padre2.parentNode.insertBefore(padre2, padre2);
        let padre3 = document.getElementById("total");
        // padre.innerHTML = padre.innerHTML + texto;
        padre3.innerHTML = String(sum*(1+19/100));// por si lo quiero alrevez
        padre3.parentNode.insertBefore(padre3, padre3);
    })

    
}
const creacion = (product, cantidad) =>{
    let x = `
    <tr>
    <td>${product.nombre}</td>
    <td>${product.precio}</td>
    <td>${cantidad}</td>
    <td>${product.precio * cantidad}</td>
    </tr>
    `
      return x;
  }




carritouw();