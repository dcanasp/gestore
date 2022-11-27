const { htmlPrefilter } = require("jquery");

const registro = async () => {
  let token;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let email = document.getElementById('email').value;
  let rol;
  if(document.getElementById('rol').checked){
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

  window.localStorage.setItem("token", token.token);

  window.location.replace("http://localhost:1234");

  
   
}

document.getElementById('botonLoginAYUDA').addEventListener('click', registro, false );
