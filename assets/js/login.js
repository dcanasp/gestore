const { default: Swal } = require("sweetalert2");

const login = async () =>{//si usuario y clave correctos, MAL NO USAR
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;
    let url = 'http://localhost:3000/checkUser/'+username+'?password='+password;
    console.log(url);
      let datos;
      const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache'
      }
      ).then(response => response.json()).then(data => datos=data);
      if(datos.token!="Algo salio mal"){
        localStorage.setItem('token',datos.token);
        window.location.replace("http://localhost:1234/index-logged.html");
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credenciales incorrectas"
      });
      }
}

document.getElementById('btnLogin').addEventListener('click', login, false)
