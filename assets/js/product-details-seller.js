const producto = async () => {
  let prod_id = localStorage.getItem("product_id");
  if (prod_id == undefined) {
    console.log("no product_id");
    return "error";
  }
  let url = "http://localhost:3000/getProduct/" + prod_id;
  let datos;
  const x = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
  })
    .then((response) => response.json())
    .then((data) => (datos = data));

  window-localStorage.setItem("producto", JSON.stringify(datos))
  
  let imagen = await getImages(datos);
  let padre = document.getElementById("image");
  let texto = creacion(imagen);
  padre.innerHTML = padre.innerHTML + texto;
  padre.parentNode.insertBefore(padre, padre);

  let padre1 = document.getElementById("info");
  let texto1 = creacion1(datos);
  padre1.innerHTML = padre1.innerHTML + texto1;
  //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre1.parentNode.insertBefore(padre1, padre1);

  let padre2 = document.getElementById("descripcion");
  let texto2 = creacion2(datos);
  padre2.innerHTML = padre2.innerHTML + texto2;
  //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre2.parentNode.insertBefore(padre2, padre2);

};

const creacion = (imagen) => {
  let x = `
    <img src="${imagen}" alt="">
    `;
  return x;
};

const creacion1 = (product) => {
  let x = `
    <li><strong>Nombre</strong>: ${product.nombre}</li>
    <li><strong>Categoria</strong>: ${product.categoria}</li>
    <li><strong>Vendedor</strong>: ${product.user_id}</li>
    <li><strong>Precio</strong>: ${product.precio}</li>
    <li><strong>Stock</strong>: ${product.stock}</li>
    `;
  return x;
};

const creacion2 = (product) => {
  let x = `
    <h2>Descripcion</h2>
    <p>
    ${product.descripcion}
    </p>
    `;
  return x;
};

const getImages = async (product) => {
  let url = "http://localhost:3000/getImages/" + product.image_id;
  let datos;
  const x = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
  })
    .then((response) => response.text())
    .then((data) => (datos = data));
  return datos;
};

const edit = async () => {

  let producto = JSON.parse(window.localStorage.getItem("producto"));

  let padre2 = document.getElementById("info");
  let texto2 = edicion(producto);
  padre2.innerHTML = texto2;
  padre2.parentNode.insertBefore(padre2, padre2);

  document.getElementById('ya').addEventListener("click", editar)

 
};

const edicion = (product) => {
  let x = `
    <li style="text-align: center"><strong>Nombre</strong>: <input id="nombre" value="${product.nombre}"></li>
    <li style="text-align: center"><strong>Categoria</strong>: <input id="Categoria" value="${product.categoria}"></li>
    <li style="text-align: center"><strong>Precio</strong>: <input id="precio" value="${product.precio}"></li>
    <li style="text-align: center"><strong>Stock</strong>: <input id="stock" value="${product.stock}"></li>
    <li style="text-align: center"><input type="button" value="Confirmar" class="btn btn-success" id= "ya"></li>
    `;
  return x;
};

const editar = async () => {

  let producto = JSON.parse(window.localStorage.getItem("producto"));

  let body={
    product_id: Number(producto.product_id),
    nombre: String(document.getElementById("nombre").value),
    descripcion: String(producto.descripcion),
    stock: Number(document.getElementById("stock").value),
    precio: Number(document.getElementById("precio").value),
    categoria: Number(document.getElementById("Categoria").value)
  }
  try{
    let url = "http://localhost:3000/SELL/editProduct/";
    let datos;
    const x = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token'),
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) =>  texto=response.text())
      .then((data) => (datos = data));
      console.log(texto)
      window.location.reload();
  }catch(e){

  }

}

producto();

document.getElementById('editar').addEventListener('click', edit);
