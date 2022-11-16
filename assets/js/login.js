"use strict";
const login = async () =>{//si usuario y clave correctos, MAL NO USAR
    localStorage.setItem('token',datos.token);
    let password = document.getElementsById('password');
    let username = document.getElementsById('username');
  
    let url = 'http://localhost:3000/checkUser/' +username+'?password='+password;
    let datos;
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      }}
      ).then(response => response.json()).then(data => datos=data);
    console.log(datos);
  

   
}





