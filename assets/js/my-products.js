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
        if(datos[i].user_id == 1){
            products.push(datos[i]);
        } 
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
    let x = `
    <div class="col-lg-4 col-md-6 portfolio-item">
    <div class="portfolio-wrap">
        <img src="${imagen}" class="img-fluid portfolio-lightbox" alt="">
        <div class="portfolio-info">
        </div>
    </div>            
    <p class="price">\$${product.precio}</p>
    <a href="product-details-seller.html" title="More Details" class="box box-link" id="${product.product_id}">${product.nombre}</a>
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

function prueba(e){
    console.log(e);
    if(e.target !== e.currentTarget){
        let clicked_e = e.target.id;
        localStorage.setItem("product_id", clicked_e)
    }
    // let prod_serialized = JSON.stringify(prod);
    // localStorage.setItem(prod.nombre + prod.product_id,prod_serialized);
}
    
productos();