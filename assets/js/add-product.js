const createNew= async() =>{

    let token = await(decode());
    let categoriaNew = Number(document.getElementById('categoria').value);
    console.log(categoriaNew);


    let data={
        user_id: Number(token.user_id),
        image_id: Number((categoriaNew*2)-getRandomInt(2)),
        nombre: String(document.getElementById('nombre').value),
        descripcion: String(document.getElementById('descripcion').value),
        stock: Number(document.getElementById('stock').value),
        precio: Number(document.getElementById('precio').value),
        categoria: Number(categoriaNew-1),
    }

    try{
        let url = 'http://localhost:3000/SELL/createProduct/';
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

        window.location.replace("http://localhost:1234/services.html");
    }catch(e){
        //MANEJO EXCEPCIÓN
    }
        
}

const decode= async() =>{
    let infoToken;
    let url = 'http://localhost:3000/decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.json()).then(data => infoToken=data);
    return infoToken;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const verify=async()=>{
    let infoToken;
    let url = 'http://localhost:3000/decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.json()).then(data => infoToken=data);
    if(infoToken.rol!=2){
      window.location.replace("http://localhost:1234/");
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