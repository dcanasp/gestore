const { htmlPrefilter } = require("jquery");

const registro = async () => {
  let token;
<<<<<<< HEAD
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let email = document.getElementById('email').value;
  let rol;
  if(document.getElementById('rol').value=='on'){
    rol=2
  }else{
    rol=1
  }
let body = {
  username: username,
  password: password,
  rol: rol,
  email: email
}
console.log(body);
console.log(JSON.stringify(body));
  const x = await fetch('http://localhost:3000/createUser', {
      method : "POST",
      mode: 'cors',
      cache: 'no-cache',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(body),
  }).then(response => response.json()).then(data => token=data);
  console.log(token);
  window.localStorage.setItem("token", token.token);
  
  let z = localStorage.getItem('token');
  window.location.replace("http://localhost:1234/");

  
   
}

document.getElementById('botonLoginAYUDA').addEventListener('click', registro, false );
=======
  let username = document.getElementsById('username');
  let password = document.getElementsById('password');
  let email = document.getElementsById('email');
  let rol = document.getElementsById('rol');
  //2 vendedor 
  //1 cliente 
  if (rol == true) {

    rol = 2
  } else {

    rol = 1
  }


}
const x = await fetch('http://localhost:3000/createUser', {
  method: "POST",
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body),
}).then(response => response.json()).then(data => token = data);
console.log(token);
window.localStorage.setItem("token", token.token);

let z = localStorage.getItem('token');
>>>>>>> ff311774c0b9f663d58a6a682ef577dcccad6cbb
