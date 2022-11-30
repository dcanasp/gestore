const getProducts = async (compra) => {
    let product=[];
    let contador=0;
    compra.forEach(async comp => {
        let url = 'http://localhost:3000/getProduct/'+comp.product_id;
        let datos;
        let x = await fetch(url, {
            method : "GET",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }}
        ).then(response => response.json()).then(cadaProducto => datos=cadaProducto);
        let z={stock:datos.stock,
            user_id:datos.user_id,
            precio: datos.precio,
            x: contador
        }

        product.push(z);
        contador++;
    })
    return product;
}

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
    
    let usuarios=  await getUsers(compra, product);


    console.log(usuarios);
    console.log(productos);
    

    let padre = document.getElementById("registroVentasPadre");
    let contador =0;
    
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

const getUsers = async (compra,producto) => {

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
    console.log(producto)
    compra.forEach(comp => {
        console.log(contador);
        let vendedor = getUser(datos, producto[contador].user_id);
        let comprador = getUser(datos, comp.user_id);
        console.log({comprador:comprador, vendedor: vendedor});

        let x={comprador:comprador.username,
            vendedor:vendedor.username,
        }
        product.push(x);
        contador++;
    });
    return product;
}

const getUser = (usuarios, user_id)=>{

    for(i=0; i<usuarios.length;i++){
        if(usuarios[i].user_id==user_id){
            return usuarios[i]
        }
    }
    return null;

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