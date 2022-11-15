console.log("si");
const products= async () =>{

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
creacion = (products,times) =>{
    console.log(times)
       let x = `<div class="col-lg-4 col-md-6 portfolio-item filter-app">
       <div class="portfolio-wrap">
         <img src="${products[times].image_id}" class="img-fluid portfolio-lightbox" alt="">
         <div class="portfolio-info">
           <div class="portfolio-links">
             <a href="assets/img/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 1"><i class="bx bx-plus"></i></a>
             
           </div>
         </div>
       </div>            
       <p class="price">${products[times].precio}</p>
       <a href="portfolio-details.html" title="More Details" class="box box-link">${products[times].nombre}</a>
     </div>`
      return x;
  }

for (let h=0;h<11;h++){
    let padre = document.getElementById("inicio");
    let texto = creacion(products,i);
    const temp = document.createElement("div");
    temp.innerHTML = texto;
    let nuevo = padre.parentNode.insertBefore(temp, padre);
}

console.log(products);
}

products();
