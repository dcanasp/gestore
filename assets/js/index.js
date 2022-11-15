console.log("si");
const productos= async () =>{

    let url = 'http://localhost:3000/getAllProducts';
    let datos;
const x = await fetch(url, {
    method : "GET",
    mode: 'cors',
    cache: 'no-cache',
    }).then(response => response.json()).then(data => datos=data);

let products=[];
for (let i=0;i<15;i++){
    products.push(datos[i]);
}
//tu funcion
console.log(products);
}

productos();
