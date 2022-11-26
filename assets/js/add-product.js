const createNew= async() =>{

    let token = await(decode());
    let categoria = Number(document.getElementById('Categoria').value)+1;

    let data={
        user_id: Number(token.user_id),
        image_id: Number((categoria*2)-Math.random(1)),
        nombre: String(document.getElementById('nombre').value),
        descripcion: String(document.getElementById('descripcion').value),
        stock: Number(document.getElementById('stock').value),
        precio: Number(document.getElementById('precio').value),
        categoria: categoria
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
        }).then(response => response.json()).then(data => datos=data);

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

document.getElementById('new').addEventListener('click',createNew,false)