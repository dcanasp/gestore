const registro = async () => {
  let token;
  let username = document.getElementsById('username');
  let password = document.getElementsById('password');
  let email = document.getElementsById('email');
  let rol = document.getElementsById('rol');
}
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
