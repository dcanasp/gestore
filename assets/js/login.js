"use strict";
//(function() {

//console.log(document.querySelector("botonLoginAYUDA"));
const registro = async () =>{//registra usuario, crea token y lo guarda
    let token;
    let body={username: "noveno",
    password: "123",
    rol: 3,
    email: "string@gmail.com"}
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
    console.log(z)


}
const crearCompra = async () =>{ //crea una compra si el token es correcto
    let body={
        user_id:113,
        fecha: (new Date()).toString(),
        product_id: 1
      }
    let datos;
    const x = await fetch('http://localhost:3000/BUY/createCompra', {
      method : "POST",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token'),
        'Content-Type':'application/json'
    },
      body: JSON.stringify(body)
      }
      ).then(response => response.text()).then(data => datos=data);
    console.log(datos);


}
const login = async () =>{//si usuario y clave correctos, MAL NO USAR
    let username='BINDY ALBINA';//document.querySelector('username');
    username.replace(' ','&')
    let password=1234;//document.querySelector('password');
    //ESPACIOS ENTRE NOMBRES ARREGLAR
    let url = 'http://localhost:3000/checkUser/' +username+'?password='+password;
    let datos;
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.json()).then(data => datos=data);
    console.log(datos);
    localStorage.setItem('token',datos.token);


}

// document.getElementById("botonLoginAYUDA").addEventListener('click', login)

//})()
