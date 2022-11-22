const login = async () =>{//si usuario y clave correctos, MAL NO USAR
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;
    console.log("AYUDA");
    let url = 'http://localhost:3000/checkUser/'+username+'?password='+password;
    let datos;
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache'
    }
    ).then(response => response.json()).then(data => datos=data);
    localStorage.setItem('token',datos.token);
    window.location.replace("http://localhost:1234/index-logged.html");
}

document.getElementById('btnLogin').addEventListener('click', login, false)
