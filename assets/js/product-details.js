
const producto = async () =>{
  let prod_id = localStorage.getItem("product_id");
  if (prod_id==undefined){
    console.log("no product_id")
    return "error"
  }
  let url = 'http://localhost:3000/getProduct/'+prod_id;
  let datos;
  const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      }).then(response => response.json()).then(data => datos=data);

  let imagen = await getImages(datos);
  let padre1 = document.getElementById("imagen-producto");
  let texto = creacion1(imagen);
  padre1.innerHTML = padre1.innerHTML + texto;
  // padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre1.parentNode.insertBefore(padre1, padre1);
  let padre2 = document.getElementById("product-info");
  texto = creacion2(datos);
  // padre2.innerHTML = padre2.innerHTML + texto;
  padre2.innerHTML = texto + padre2.innerHTML;// por si lo quiero alrevez
  padre2.parentNode.insertBefore(padre2, padre2);
  let padre3 = document.getElementById("product-description");
  texto = creacion3(datos);
  padre3.innerHTML = padre3.innerHTML + texto;
  // padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre3.parentNode.insertBefore(padre3, padre3);
  document.getElementById("quantity").setAttribute("max",datos.stock)
};

const creacion1 = (imagen) =>{
    let x = `<img src="${imagen}" alt="">`
    return x;
  }

  const creacion2 = (product) =>{
    let x = `<h3>Informacion del producto</h3>
    <ul>
      <li><strong>Categoria</strong>: ${product.categoria}</li>
      <li><strong>Vendedor</strong>: ${product.user_id}</li>
      <li><strong>Precio</strong>: ${product.precio}</li>
      <li><strong>Stock</strong>: ${product.stock}</li>
       
    </ul>`
    return x;
  }
  const creacion3 = (product) =>{
    let x = `
    <h2>Descripcion</h2>
    <p>
      ${product.descripcion}
    </p>`
    return x;
  }

const getImages = async (product) => {
    let url = 'http://localhost:3000/getImages/' + product.image_id;
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        }).then(response => response.text()).then(data => datos=data);
    return datos;
}
    
const verify=async()=>{
  if(localStorage.getItem('token')!=undefined){
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
      
      let padre = document.getElementById("buttons");
    console.log(infoToken.rol);
    if(infoToken.rol==2){
        let texto = `<li><a href="services.html" >Mis Productos</a></li>`;
        padre.innerHTML = padre.innerHTML + texto;
  
        padre.addEventListener("load", false);
        return;
    }else if(infoToken.rol==3){
        let texto = `<li><a href="pruebaGraficas.html" >Stats</a></li>
        <li><a href="registro-ventas.html" >Ventas</a></li>
        <li><a href="eliminar-usuario.html" >Eliminar usuario</a></li>`;
        padre.innerHTML = padre.innerHTML + texto;
  
        padre.addEventListener("load", false);
        return;
    }else{
        let texto = `<li><a href="carrito-compra.html"><img src="assets\img\cart.png" class="opt"></a></li>`;
        padre.innerHTML = padre.innerHTML + texto;
  
        padre.addEventListener("load", false);
        return;
  }
  }

}

const comprar=()=>{
  console.log("AYUFA");
  if(localStorage.getItem("carrito") == undefined){
    localStorage.setItem("carrito", localStorage.getItem("product_id") + "/" + String(document.getElementById("quantity").value))
  }
  else{
    localStorage.setItem("carrito", localStorage.getItem("carrito") + "+" + localStorage.getItem("product_id") + "/" + String(document.getElementById("quantity").value))
  }
}

verify();

producto();

document.getElementById("comprar1").addEventListener("click", comprar, false)