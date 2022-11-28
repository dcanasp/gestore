const create = async() =>{

  let url = 'http://localhost:3000/getUser/';
    let user;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }}).then(response => response.json()).then(data => user=data.token);
  let padre = document.getElementById("form");
  let texto = creacion0(user);
  padre.innerHTML = texto;
  //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre.parentNode.insertBefore(padre, padre);
  document.getElementById("editar").setAttribute("style", "display:block;");

}

const change = async() =>{

  let url = 'http://localhost:3000/getUser/';
    let user;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }}).then(response => response.json()).then(data => user=data.token);

  let padre = document.getElementById("form");
  let texto = creacion(user);
  padre.innerHTML = texto;
  //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre.parentNode.insertBefore(padre, padre);
  document.getElementById("confirm").setAttribute("style", "display:block;");
  document.getElementById("editar").setAttribute("style", "display:none;");

}

const creacion0 = (user) =>{
  let x = `
  <label for="username">${user.username}</label>
  <label for="email">${user.email}</label>
  <label for="password">${user.password}</label>
  `
    return x;
}

const creacion = (user) =>{
  let x = `
  <input type="text" class="lgn" placeholder="username" id="username" value="${user.username}">
  <label for="username">${user.email}</label>
  <input type="text" class="lgn" placeholder="Password" id="password" value="${user.password}">
  `
    return x;
}

const edit = async() =>{



      let url0 = 'http://localhost:3000/getUser/';
    let user;
    const x0 = await fetch(url0, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }}).then(response => response.json()).then(data => user=data.token);
        console.log(user)
        let body= {
          user_id: Number(user.user_id),
          username: String(document.getElementById('username').value),
          password: String(document.getElementById('password').value),
          email: String(user.email)
      }
      console.log(body)

        let url = "http://localhost:3000/editUser/";
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
          console.log(texto)
      if(texto != 'Algo salio mal'){
        window.location.reload();
      }

}

const verify=async()=>{
    if(localStorage.getItem('token')==undefined){
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
