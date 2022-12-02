const createNew= async() =>{

    let token = await(decode());
    let categoriaNew = Number(document.getElementById('categoria').value);
    let image;
    if(categoriaNew==0){
      image=1;
    }else{
      image= (categoriaNew*2)+getRandomInt(2);
    }


    let data={
        user_id: Number(token.user_id),
        image_id: Number(image),
        nombre: String(document.getElementById('nombre').value),
        descripcion: String(document.getElementById('descripcion').value),
        stock: Number(document.getElementById('stock').value),
        precio: Number(document.getElementById('precio').value),
        categoria: Number(categoriaNew+1),
    }

    let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//SELL/createProduct/';
    let datos;
    const x = await fetch(url, {
      method : "POST",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token'),
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
      }).then(response => response.text());

      if(response != 'Algo salio mal'){
        window.location.replace("http://localhost:1234/services.html");
      }        
}

const decode= async() =>{
    let infoToken;
    let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.text()).then(data => infoToken=data);
    if(response != 'Algo salio mal'){
      return infoToken;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const verify=async()=>{
  if(localStorage.getItem('token')!=undefined){
    let infoToken;
    let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
    }}
    ).then(response => response.text()).then(data => infoToken=data);
    if(response != 'Algo salio mal'){
      if(infoToken.rol!=2){
        window.location.replace("http://localhost:1234/");
      }
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

verify()

document.getElementById('new').addEventListener('click',createNew,false)

document.getElementById("logOut").addEventListener("click", logout);    