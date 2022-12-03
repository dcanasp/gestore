const productos= async () =>{
  let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000'+'/getAllProducts';
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
            padre.parentNode.insertBefore(padre, padre);
            contador ++;
        })

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
          </div>
      </div>
  </div>            
  <p class="price">\$${product.precio}</p>
  <a href="http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/portfolio-details.html" title="More Details" class="box box-link" id="${product.product_id}">${product.nombre}</a>
  </div>
  `
    return x;
}

const getImages = async (products) => {
  let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000'+'/getAllImages';
  let datos;
  const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      }).then(response => response.json()).then(data => datos=data);

  let imagenes=[];
  products.forEach(prod => {
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

const verify=async()=>{
    if(window.localStorage.getItem('token')!=undefined){

        let infoToken;
        let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000'+'/decodeToken/';
        const x = await fetch(url, {
          method : "GET",
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }}
          ).then(response => response.json()).then(data => infoToken=data);
          
          let padre = document.getElementById("buttons");
          
        if(infoToken.rol==2){
            let texto = `<li><a href="http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/services.html" >Mis Productos</a></li>`;
            padre.innerHTML = padre.innerHTML + texto;
    
            padre.addEventListener("load", false);
            return;
        }else if(infoToken.rol==3){
            let texto = `<li><a href="http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/graficas.html" >Stats</a></li>
            <li><a href="http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/registro-ventas.html" >Ventas</a></li>
            <li><a href="http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/eliminar-usuario.html" >Eliminar usuario</a></li>`;
            padre.innerHTML = padre.innerHTML + texto;
    
            padre.addEventListener("load", false);
            return;
        }else{
            document.getElementById('carrito').setAttribute('style','display:block;');    
            padre.addEventListener("load", false);
            return;
        }

    }else{
        window.location.replace("http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/index.html");
    }
}

const logout = () =>{
    window.localStorage.removeItem('token');
    window.location.replace("http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/index.html");
    return;
}

productos();
verify();

document.getElementById("logOut").addEventListener("click", logout);    