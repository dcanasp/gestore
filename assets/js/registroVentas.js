const crearCompra = async () =>{ //crea una compra si el token es correcto
    let url = 'http://localhost:3000/getAllClients';
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        }).then(response => response.text()).then(data => datos=data);

    let products=[];
    for (let i=0;i<16;i++){
        products.push(datos[i]);
    }
    
    let imagenes = await getImages(datos);
    let padre = document.getElementById("ventasInicio");
    let contador =0;
    products.forEach(prod => {
        let texto = creacion(prod,imagenes[contador]);
        padre.innerHTML = padre.innerHTML + texto;
        //padre.innerHTML = texto + padre.innerHTML;// por si lo quiero alrevez
        padre.parentNode.insertBefore(padre, padre);
        contador ++;
    })
    return;
}

const creacion = (product,imagen) =>{
    let x = `
    <div class="card col-lg-4 col-md-6 portfolio-item filter-app" >
                <img src="${imagen}" class="card-img" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${product.nombre}</h5>
                  <p class="card-text">12/11/22</p>
                  <p class="price">\$${product.precio}</p>
                  <a href="#" class="btn btn-primary">Ver detalles</a>
                </div>
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
crearCompra();