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
    for (let i=0;i<15;i++){
        products.push(datos[i]);
    }
    let padre = document.getElementById("inicio");
    console.log(padre);
    products.forEach(prod => {
        let texto = creacion(prod);
        const temp = document.createElement("div");
        temp.innerHTML = texto;
        padre.parentNode.insertBefore(temp, padre);
    });

    console.log(products);
}

const creacion = (product) =>{
    let x = `
    <div class="col-lg-4 col-md-6 portfolio-item filter-app">
    <div class="portfolio-wrap">
        <img src="${product.image_id}" class="img-fluid portfolio-lightbox" alt="">
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


productos();

// const getImages = async (products) => {
// let url = 'http://localhost:3000/getAllImages';
// let datos;
// const x = await fetch(url, {
//     method : "GET",
//     mode: 'cors',
//     cache: 'no-cache',
//     }).then(response => response.json()).then(data => datos=data);

// let imagenes=[];
// console.log("aqui");
// console.log(datos);
// products.forEach(prod => {
//     imagenes.push(datos[prod.image_id].image);
// });


// }
