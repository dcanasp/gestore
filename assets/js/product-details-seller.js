const producto = async () =>{
  let prod_id = localStorage.getItem("product_id");
  if (prod_id==undefined){
    console.log("no product_id")
    return "error"
  }
  let url = 'http://localhost:3000/getProduct/'+ prod_id;
  let datos;
  const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      }).then(response => response.json()).then(data => datos=data);

  let imagen = await getImages(datos);
  let padre = document.getElementById("detalleProducto");
  let texto = creacion(datos, imagen);
  padre.innerHTML = padre.innerHTML + texto;
  //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
  padre.parentNode.insertBefore(padre, padre);
};
    


const creacion = (product,imagen) =>{
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
                <li><strong>Categoria</strong>: ${product.categoria}</li>
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
    
producto();
