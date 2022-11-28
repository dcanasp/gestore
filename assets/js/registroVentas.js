const getCompras = async () =>{ //crea una compra si el token es correcto
    let url = 'http://localhost:3000/ADMIN/getAllClients';
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }}
        ).then(response => response.json()).then(data => datos=data);
        let compras=[];
        for (let i=0;i<datos.length;i++){
            compras.push(datos[i]);
        }
    let productos = await getProducts(compras);
    let usuarios= await getUsers(compras,productos);
    let padre = document.getElementById("registroVentasPadre");
    let contador =0;
    console.log(compras);
    console.log(productos);
    console.log(usuarios);
    
    compras.forEach(comp => {
            let texto = creacion(comp,productos[contador],usuarios[contador]);
            padre.innerHTML = padre.innerHTML + texto;
            //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
            padre.parentNode.insertBefore(padre, padre);
            contador ++;
        })
        
    return;
}

const creacion = (compra,product,usuario) =>{
    let x = `
    <tr>
        <td class="text-left">${usuario.comprador}</td>
        <td class="text-left">${compra.fecha.substring(4,15)}</td>
        <td class="text-left">${product.stock}</td>
        <td class="text-left">${usuario.vendedor}</td>
        <td class="text-left">${product.precio}</td>
        </tr>
    `
      return x;
  }



const getProducts = async (compra) => {
    let product=[];
    compra.forEach(async comp => {
    let cadaProducto =await getProductoUnico(comp.product_id);
        let z={stock:cadaProducto.stock,
            user_id:cadaProducto.user_id,
            precio: cadaProducto.precio
        }

        product.push(z);
    })
    return product;
}
const getProductoUnico = async (product_id) => {
        let url = 'http://localhost:3000/getProduct/'+product_id;
        let datos;
        let z = await fetch(url, {
            method : "GET",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }}
        ).then(response => response.json()).then(cadaProducto => datos=cadaProducto);
        return datos;
}

const getUsers = async (compra,producto) => {
    console.log(compra);
    console.log(producto);
    let url = 'http://localhost:3000/ADMIN/getAllUsers';
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }}
        ).then(response => response.json()).then(data => datos=data);
    let product=[];
    let contador = 0;
    compra.forEach(async comp => {
        let productoActual = await getProductoUnico(producto[contador].user_id-1);
        console.log({comprador:datos[comp.user_id-1], vendedor: datos[producto[contador].user_id-1]});

        let x={comprador:datos[comp.user_id-1].username,
            vendedor:datos[producto[contador].user_id-1].username,
        }
        product.push(x);
        contador++;
    });
    return product;
}

const verify=async()=>{
    if(localStorage.getItem('token')!=undefined){
        let infoToken;
        let url = 'http://localhost:3000/decodeToken/';
        const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }}
        ).then(response => response.json()).then(data => infoToken=data);
        if(infoToken.rol!=3){
        window.location.replace("http://localhost:1234/");
        }
    }else{
        window.location.replace("http://localhost:1234/index.html/");
    }
}

const logout = () =>{
    window.localStorage.removeItem('token');
    window.location.replace("http://localhost:1234/index.html");
    return;
}

verify();

getCompras();

document.getElementById("logOut").addEventListener("click", logout);    