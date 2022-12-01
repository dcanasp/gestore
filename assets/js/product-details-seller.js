const producto = async () => {
  let prod_id = localStorage.getItem("product_id");
  if (prod_id == undefined) {
    return "error";
  }
  let url = "http://localhost:3000/getProduct/" + prod_id;
  let datos;
  const x = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
  })
    .then((response) => response.text())
    .then((data) => (datos = data));
  if(response != 'Algo salio mal'){
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
  }
};

const creacion = (imagen) => {
  let x = `
    <img src="${imagen}" alt="">
    `;
  return x;
};

const creacion1 = (product) => {
  let cat;
  if(product.categoria==0){
    cat='No definida'
  }else if(product.categoria==1){
    cat= 'Mouse';
  }else if(product.categoria==2){
    cat= 'Teclado';
  }else if(product.categoria==3){
    cat= 'WebCam';
  }else if(product.categoria==4){
    cat= 'Altavoces';
  }else if(product.categoria==5){
    cat= 'Cable Ethernet';
  }else{
    cat= 'Pantalla';
  }

  let x = `
    <li><strong>Nombre</strong>: ${product.nombre}</li>
    <li><strong>Categoria</strong>: ${cat}</li>
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
  if(response != 'Algo salio mal'){
    return datos;
  }
};

const edit = async () => {

  let producto = JSON.parse(window.localStorage.getItem("producto"));

  let padre2 = document.getElementById("info");
  let texto2 = edicion(producto);
  padre2.innerHTML = texto2;
  padre2.parentNode.insertBefore(padre2, padre2);

  let padre3 = document.getElementById("descripcion");
  let texto3 = '';
  padre3.innerHTML = texto3;
  //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre3.parentNode.insertBefore(padre3, padre3);

  document.getElementById('ya').addEventListener("click", editar)

 
};

const edicion = (product) => {
  let x = `
    <li style="text-align: center"><strong>Nombre</strong>: <input id="nombre" value="${product.nombre}"></li>
    <li style="text-align: center" ><strong style="padding: 10px">Categoria:</strong>
                    <select name="categoria" id="categoria" value=${product.categoria}>
                      <option value=1>Mouse</option>
                      <option value=2>Teclado</option>
                      <option value=3>WebCam</option>
                      <option value=4>Altavoces</option>
                      <option value=5>Cable Ethernet</option>
                      <option value=6>Pantalla</option>
                      <option value=0>Otro</option>
                    </select>
                    </li>
    <li style="text-align: center"><strong>Precio</strong>: <input type="number" id="precio" value="${product.precio}"></li>
    <li style="text-align: center"><strong>Stock</strong>: <input type="number" id="stock" value="${product.stock}"></li>
    <li style="text-align: center"><strong style="padding: 5px">Descripcion:</strong><textarea name="descripcion" id = "newDescrip" cols="25" rows="2" >${product.descripcion}</textarea></li>
    <li style="text-align: center"><input type="button" value="Confirmar" class="btn btn-success" id= "ya"></li>
    `;
  return x;
};

const editar = async () => {

  let producto = JSON.parse(window.localStorage.getItem("producto"));

  let categoriaNew = Number(document.getElementById('categoria').value);
  let image;
    if(categoriaNew==0){
      image=1;
    }else{
      image= (categoriaNew*2)+getRandomInt(2);
    }

  let body={
    product_id: Number(producto.product_id),
    image_id: Number(image),
    nombre: String(document.getElementById("nombre").value),
    descripcion: String(document.getElementById("newDescrip").value),
    stock: Number(document.getElementById("stock").value),
    precio: Number(document.getElementById("precio").value),
    categoria: Number(categoriaNew+1)
  }
  
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
  if(response != 'Algo salio mal'){
      window.location.reload();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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
    if(infoToken.rol!=2){
      window.location.replace("http://localhost:1234/");
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

verify();

producto();

document.getElementById('editar').addEventListener('click', edit);

document.getElementById("logOut").addEventListener("click", logout);    