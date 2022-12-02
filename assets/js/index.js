const productos= async () =>{
    let url = process.env.urlBack+'/getAllProducts';
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        }).then(response => response.json()).then(data => datos=data);
    let products=[];
    for (let i=0;i<datos.length;i++){
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
    })
    console.log(padre);

    padre.addEventListener("click", prueba, false);
    return;
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
    <p class="price">\$${product.precio}</p>
    <a href="portfolio-details.html" title="More Details" class="box box-link" id="${product.product_id}">${product.nombre}</a>
    </div>
    `
      return x;
  }



const getImages = async (products) => {
    let url = process.env.urlBack+'/getAllImages';
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        }).then(response => response.json()).then(data => datos=data);
    console.log(datos)
    let imagenes=[];
    console.log(products)
    products.forEach(prod => {
        console.log(datos[prod.image_id-1]);
        imagenes.push(datos[prod.image_id-1].image);
    });
    return imagenes;

}

function prueba(e){
    console.log(e);
    if(e.target !== e.currentTarget){
        let clicked_e = e.target.id;
        localStorage.setItem("product_id", clicked_e)
    }
    // let prod_serialized = JSON.stringify(prod);
    // localStorage.setItem(prod.nombre + prod.product_id,prod_serialized);
}

const verify = async()=>{
    if(window.localStorage.getItem("token")!=undefined){
        window.location.replace("http://localhost:1234/index-logged.html");
    }
    return;
}
verify();
productos();
