console.log("INICIO");
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
console.log("funciono?");
let imagenes = getImages(products);
console.log(imagenes);
}
productos();

const getImages = async (products) => {
let url = 'http://localhost:3000/getAllImages';
let datos;
const x = await fetch(url, {
    method : "GET",
    mode: 'cors',
    cache: 'no-cache',
    }).then(response => response.json()).then(data => datos=data);

let imagenes=[];
console.log("aqui");
console.log(datos);
products.forEach(prod => {
    imagenes.push(datos[prod.image_id].image);
});


}
