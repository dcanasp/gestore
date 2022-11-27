const google = async () =>{//si usuario y clave correctos, MAL NO USAR
    // let url = 'http://localhost:3000/GOOGLE/auth/google';
    // let datos;
    // const x = await fetch(url, {
    //     method : "GET",
    //     mode: 'cors',
    //     cache: 'no-cache',
    // }).then(response => response.text()).then(data => datos=data);

    // console.log(datos);//email

    createIframe()
}
const createIframe = async () =>{//si usuario y clave correctos, MAL NO USAR
    let iframe = document.getElementById("iframeGoogle")
    let texto = `<li><a href="pruebaGraficas.html" >Stats</a></li>
        <li><a href="registro-ventas.html" >Ventas</a></li>
        <li><a href="eliminar-usuario.html" >Eliminar usuario</a></li>`;
        padre.innerHTML = padre.innerHTML + texto;

}
document.getElementById('google').addEventListener('click', google, false)
