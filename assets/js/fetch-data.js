"use strict"
import { text } from "stream/consumers";

export default class dinamismo {
    //nueva_linea = document.getElementById("inicio");

    constructor(products,enfocado){
      return this.chats(products,enfocado);
      // temp.addEventListener("click", ()=>
      //   this.chats(number,content)
      // );

    }
    chats = (products,enfocado) =>{

      let padre = document.getElementById("inicio");
      let texto = this.creacion(products,enfocado);
      const temp = document.createElement("div");
      temp.innerHTML = texto;
      let nuevo = padre.parentNode.insertBefore(temp, padre);
        
      return nuevo;

        
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

}


// console.log("almenos entra");
// const render = () =>{
    
//     x = document.getElementById("inicio").addEventListener("click", chats);

// }
//export default render();