import { default as Swal } from "sweetalert2";
const create = async() =>{

  let url = 'http://localhost:3000'+'/getUser/';
    let user;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }}).then(response => response.json()).then(data => user=data.token);
  
  if(user != 'Algo salio mal'){

    let padre = document.getElementById("form");
    let texto = creacion0(user);
    padre.innerHTML = texto;
    //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
    padre.parentNode.insertBefore(padre, padre);
    document.getElementById("editar").setAttribute("style", "display:block;");

  }
  else{
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: "Algo salio mal"
  });
  }
    

}

const change = async() =>{

  let url = 'http://localhost:3000'+'/getUser/';
    let user;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }}).then(response => response.json()).then(data => user=data.token);

  if(user != 'Algo salio mal'){

    let padre = document.getElementById("form");
    let texto = creacion(user);
    padre.innerHTML = texto;
    //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
    padre.parentNode.insertBefore(padre, padre);
    document.getElementById("confirm").setAttribute("style", "display:block;");
    document.getElementById("editar").setAttribute("style", "display:none;");

  }
  else{
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: "Algo salio mal"
  });
  }

}

const creacion0 = (user) =>{
  let x = `
  <label for="username"><strong>Username:</strong> ${user.username}</label><br>
  <label for="email"><strong>Email:</strong> ${user.email}</label><br>
  <label for="password"><strong>Contraseña:</strong> ${user.password}</label><br>
  `
    return x;
}

const creacion = (user) =>{
  let x = `
  <label for="username" class="form-label"><strong>Username:</strong></label>
  <input type="text" class="form-control" style="width: auto; height: auto" placeholder="username" id="username" value="${user.username}"><br>
  <label for="email"><strong>Email:</strong><br> ${user.email}</label><br>
  <label for="password" class="form-label"><strong>Contraseña:</strong></label>
  <input type="text" class="form-control" style="width: auto; height: auto" placeholder="Password" id="password" value="${user.password}"><br>
  `
    return x;
}

const edit = async() =>{

    let url0 = 'http://localhost:3000'+'/getUser/';
    let user;
    const x0 = await fetch(url0, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }}).then(response => response.json()).then(data => user=data.token);

    if(user != 'Algo salio mal'){

      let body= {
        user_id: Number(user.user_id),
        username: String(document.getElementById('username').value),
        password: String(document.getElementById('password').value),
        email: String(user.email)
      }
      let url = 'http://localhost:3000'+'/editUser/';
      let datos;
      const x = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('token'),
          'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
      })
      .then((response) =>  texto=response.text())
      .then((data) => (datos = data));
      if(texto != 'Algo salio mal'){
        window.location.reload();
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

}

const verify=async()=>{
    if(localStorage.getItem('token')!=undefined){
      let infoToken;
      let url = 'http://localhost:3000'+'/decodeToken/';
      const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }}
        ).then(response => response.json()).then(data => infoToken=data);

      if(infoToken != 'Algo salio mal'){
        let padre = document.getElementById("buttons");
        if(infoToken.rol==2){
            let texto = `<li><a href="services.html" >Mis Productos</a></li>`;
            padre.innerHTML = padre.innerHTML + texto;
      
            padre.addEventListener("load", false);
            return;
        }else if(infoToken.rol==3){
            let texto = `<li><a href="graficas.html" >Stats</a></li>
            <li><a href="registro-ventas.html" >Ventas</a></li>
            <li><a href="eliminar-usuario.html" >Eliminar usuario</a></li>`;
            padre.innerHTML = padre.innerHTML + texto;
      
            padre.addEventListener("load", false);
            return;
        }else{
          document.getElementById('carrito').setAttribute('style','display:block;');
            document.getElementById('comp').setAttribute('style','display:block;');
            padre.innerHTML = padre.innerHTML + texto;
      
            padre.addEventListener("load", false);
            return;
        }
    }
    }else{
      window.location.replace("http://localhost:1234/");
    }
  
  }
  
  const logout = () =>{
    window.localStorage.removeItem('token');
    window.location.replace("http://localhost:1234/index.html");
    return;
  }

verify();

create();

document.getElementById("logOut").addEventListener("click", logout); 

document.getElementById("editar").addEventListener("click", change); 

document.getElementById("confirm").addEventListener("click", edit); 
