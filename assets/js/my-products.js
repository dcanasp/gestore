const { default: Swal } = require("sweetalert2");
const decode=async()=>{
    let infoToken;
    let url = process.env.urlBack+'/decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.json()).then(data => infoToken=data);
    return infoToken.user_id;
}

const productos= async () =>{
    let user_id = await decode();
    let url = process.env.urlBack+'/SELL/getProducts/'+String(user_id);
    let datos;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
        }).then(response => response.json()).then(data => datos=data);
    if(datos.error != 'Algo salio mal'){
        let products=[];

        for (let i=0;(i<16)&&(i<datos.length);i++){
            products.push(datos[i]);
        }
        
        let imagenes=[];
        if(products.length!=0){
            imagenes = await getImages(products);
        }

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
    else{
        Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Algo salio mal"
        });
    }
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
    <a href="http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/product-details-seller.html" title="More Details" class="box box-link" id="${product.product_id}">${product.nombre}</a>
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

const verify=async()=>{
    if(localStorage.getItem('token')!=undefined){
    let infoToken;
        let url = process.env.urlBack+'/decodeToken/';
        const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }}
        ).then(response => response.json()).then(data => infoToken=data);
        if(infoToken.rol!=2){
        window.location.replace("http://localhost:1234/");
        }
    }else{
        window.location.replace("http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/");
    }
}

const logout = () =>{
    window.localStorage.removeItem('token');
    window.location.replace("http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/");
    return;
}

productos();

verify();

document.getElementById("logOut").addEventListener("click", logout);    