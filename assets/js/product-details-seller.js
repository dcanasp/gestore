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

  let imagen = await getImages(datos);
  let padre = document.getElementById("image");
  let texto = creacion(imagen);
  padre.innerHTML = padre.innerHTML + texto;
  //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre.parentNode.insertBefore(padre, padre);

  let padre1 = document.getElementById("info");
  let texto1 = creacion1(datos);
  padre1.innerHTML = padre1.innerHTML + texto1;
  //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre.parentNode.insertBefore(padre1, padre1);

  let padre2 = document.getElementById("info");
  let texto2 = creacion2(datos);
  padre2.innerHTML = padre2.innerHTML + texto2;
  //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre.parentNode.insertBefore(padre2, padre2);

};

const creacion = (imagen) => {
  let x = `
    <img src="${imagen}" alt="">
    `;
  return x;
};

const creacion1 = (product) => {
  let x = `
    <li><strong>Nombre</strong>: ${product.categoria}</li>
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
  let url = "http://localhost:3000/SELLER/editProduct/";
  let datos;
  const x = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
  })
    .then((response) => response.text())
    .then((data) => (datos = data));
};

producto();

document.getElementById('eliminar').addEventListener('click', edit, false)
