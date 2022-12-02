
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
    carritou = eliminarDupe(carritou)
    let sum = 0;
    let cantidad = 0;
    carritou.forEach(async (product) => {
        let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//getProduct/'+product.product_id;
        let datos;
        const x = await fetch(url, {
            method : "GET",
            mode: 'cors',
            cache: 'no-cache',
        }).then(response => response.json()).then(data => datos=data);

        if(datos != 'Algo salio mal'){
            cantidad = product.quantity;
            let quantity = cantidad;
            if(cantidad>datos.stock){
                quantity = datos.stock;
            }
            sum = sum + datos.precio * quantity;
            let padre = document.getElementById("carritou");
            let texto = creacion(datos, quantity);
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
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Algo salio mal"
            });
        }
    })
        
}
const creacion = (product, cantidad) =>{
    let x = `
    <tr>
    <td>${product.nombre}</td>
    <td>${product.precio}</td>
    <td>${cantidad}</td>
    <td>${product.precio * cantidad}</td>
    <td><input type="button" class="btn btn-danger" id="remove" value="Eliminar" onClick= "remove(${product.product_id})"></input></td>
    </tr>
    `
      return x;
  }

const comprar = async() =>{

    let user = await decode();
    let x = localStorage.getItem("carrito").split("+")
    let carritou= new Set();
    x.forEach(e => {
        let y = e.split("/")
        let r = {"product_id": y[0], "quantity": y[1]}
        carritou.add(r)  
    })
    carritou = eliminarDupe(carritou)
    let data;
    let body;
    carritou.forEach(async (product) => {
        let url0 = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//getProduct/'+product.product_id;
        let datos0;
        const x0 = await fetch(url0, {
            method : "GET",
            mode: 'cors',
            cache: 'no-cache',
        }).then(response => response.json()).then(data => datos0=data);
        if(datos0 != 'Algo salio mal'){
            let quantity = Number(product.quantity);
            if(Number(cantidad)>Number(datos0.stock)){
                quantity = Number(datos0.stock);
            }
            data ={
                user_id: Number(user.user_id),
                fecha: new Date(Date.now()).toString(),
                product_id: Number(product.product_id),
            }
        
            let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//BUY/createCompra/';
            let datos;
            const x = await fetch(url, {
                method : "POST",
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => datos = response.text());
            if(datos!="Algo salio mal"){
                body={
                    product_id:Number(product.product_id),
                    stock: Number(Number(datos0.stock)-quantity)
                }
                let url = "http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//SELL/editProduct/";
                let texto;
                const x = await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwicm9sIjozLCJpYXQiOjE2NjkyNTQ2MTk5OTh9.8NmD-5J5ffsfXRGN2htCJDQ1YCT_aMGl6r95Hm9O7Gs',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(body)
                })
                .then((response) =>  texto=response.text())
                .then((data) => (datos = data));
                if(texto!="Algo salio mal"){
                    window.localStorage.removeItem('carrito');
                    window.location.replace("http://localhost:1234/index-logged.html/");
                }
                
                else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops",
                        text: "Algo salio mal"
                    });
                }
                Swal.fire({
                    icon: "success",
                    title: "Valido",
                    text: "Compra realizada"
                });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops",
                    text: "Algo salio mal"
                });
            }
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Algo salio mal"
            });
        }
    })
    window.location.reload;
}

const decode= async() =>{
    let infoToken;
    let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.text()).then(data => infoToken=data);
    if(response != 'Algo salio mal'){
        return infoToken;
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Algo salio mal"
        });
    }
}

function remove(product_id){

    let x = localStorage.getItem("carrito").split("+")
    let newCarrito='';
    x.forEach(e => {
        let y = e.split("/")
        if(Number(y[0])!=product_id){
            newCarrito+=e+'+';
        }
    })
    newCarrito=newCarrito.substring(0, newCarrito.length-1)
    localStorage.setItem('carrito',newCarrito)
    window.location.reload();

}

carritouw();

document.getElementById('comprar').addEventListener('click', comprar)