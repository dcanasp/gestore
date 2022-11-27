
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
  let padre = document.getElementById("detalleProducto");
  let texto = creacion(datos, imagen);
  // padre.innerHTML = padre.innerHTML + texto;
  padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre.parentNode.insertBefore(padre, padre);
  document.getElementById("quantity").setAttribute("max",datos.stock)
};

const creacion = (product,imagen) =>{

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
    <!-- ======= Portfolio Details Section ======= -->
    <section id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row gy-4">

          <div class="col-lg-8">
            <div class="portfolio-details-slider swiper">
              <div class="swiper-wrapper align-items-center">

                <div class="swiper-slide">
                  <img src="${imagen}" alt="">
                </div>

                <div class="swiper-slide">
                  <img src="assets/img/portfolio/portfolio-2.jpg" alt="">
                </div>

                <div class="swiper-slide">
                  <img src="assets/img/portfolio/portfolio-3.jpg" alt="">
                </div>

              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="portfolio-info">
              <h3>Informacion del producto</h3>
              <ul>
                <li><strong>Categoria</strong>: ${cat}</li>
                <li><strong>Vendedor</strong>: ${product.user_id}</li>
                <li><strong>Precio</strong>: ${product.precio}</li>
                <li><strong>Stock</strong>: ${product.stock}</li>
                 
              </ul>
            </div>
            <div class="portfolio-description">
              <h2>Descripcion</h2>
              <p>
                ${product.descripcion}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Portfolio Details Section -->
    `
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
        let texto = `<li><a href="carrito-compra.html" ><img src="assets\img\cart.png" class="opt"></a></li>`;
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