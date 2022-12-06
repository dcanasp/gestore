const { default: Swal } = require("sweetalert2");
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

    let url = 'process.env.urlBack/SELL/createProduct/';
    let texto;
    const x = await fetch(url, {
      method : "POST",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token'),
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
      }).then(response => texto=response.text());

      if(texto != 'Algo salio mal'){
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Producto agregado con éxito.",
          didClose:()=>{
            window.location.replace(process.env.urlFront+"/services.html");
          }
      });
        
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Algo salio mal"
      });
      }        
}

const decode= async() =>{
    let infoToken;
    let url = process.env.urlBack+'/decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.json()).then(data => infoToken=data);
    if(infoToken != 'Algo salio mal'){
      return infoToken;
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Algo salio mal"
    });
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const verify=async()=>{
  if(localStorage.getItem('token')!=undefined){
    let infoToken;
    let url = process.env.urlBack+'/decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
    }}
    ).then(response => response.json()).then(data => infoToken=data);
    if(infoToken.rol != 'Algo salio mal'){
      if(infoToken.rol!=2){
        window.location.replace(process.env.urlFront+"/");
      }
    }
  }else{
    window.location.replace("http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/");
  }
}

const logout = () =>{
    window.localStorage.removeItem('token');
    window.location.replace("http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/");
    return;
}

verify()

document.getElementById('new').addEventListener('click',createNew,false)

document.getElementById("logOut").addEventListener("click", logout);    