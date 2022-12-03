const { default: Swal } = require("sweetalert2");
const getCompras = async () =>{ //crea una compra si el token es correcto
    let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000'+'/ADMIN/getAllPurcharse';
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }}
        ).then(response => response.json()).then(data => datos=data);
    
    if(datos != []){
        let padre = document.getElementById('registroVentasPadre');

        datos.forEach(comp => {
            let texto = creacion(comp);
            padre.innerHTML = padre.innerHTML + texto;
            //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
            padre.parentNode.insertBefore(padre, padre);
        })
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Algo salio mal"
        });
    }        
    return;
}

const creacion = (compra) =>{
    let x = `
    <tr>
        <td class="text-left">${compra.usuario.username}</td>
        <td class="text-left">${compra.fecha.substring(4,15)}</td>
        <td class="text-left">${compra.producto.stock}</td>
        <td class="text-left">${compra.producto.usuario.username}</td>
        <td class="text-left">${compra.producto.precio}</td>
        </tr>
    `
      return x;
  }

const verify=async()=>{
    if(localStorage.getItem('token')!=undefined){
        let infoToken;
        let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000'+'/decodeToken/';
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