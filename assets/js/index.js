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
    for (let i=0;i<16;i++){
        products.push(datos[i]);
    }
    let imagenes = await getImages(products);

    let padre = document.getElementById("inicio");
    let contador =0;
    products.forEach(prod => {
        let texto = creacion(prod,imagenes[contador]);
        padre.innerHTML = padre.innerHTML + texto;
        //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
        padre.parentNode.insertBefore(padre, padre);
        contador ++;
    });

}

const creacion = (product,imagen) =>{
    let filtro = ['filter-app','filter-card','filter-web']
    let x = `
    <div class="col-lg-4 col-md-6 portfolio-item ${filtro[Math.floor(Math.random()*filtro.length)]}">
    <div class="portfolio-wrap">
        <img src="${imagen}" class="img-fluid portfolio-lightbox" alt="">
        <div class="portfolio-info">
            <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 1"><i class="bx bx-plus"></i></a>
            </div>
        </div>
    </div>            
    <p class="price">${product.precio}</p>
    <a href="portfolio-details.html" title="More Details" class="box box-link">${product.nombre}</a>
    </div>
    `
      return x;
  }



const getImages = async (products) => {
    let url = 'http://localhost:3000/getAllImages';
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        }).then(response => response.json()).then(data => datos=data);

    let imagenes=[];
    products.forEach(prod => {
        imagenes.push(datos[prod.image_id].image);
    });
    return imagenes;

}

productos();
