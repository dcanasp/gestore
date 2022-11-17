const crearChart = async () => {
let datos;
const x = await fetch('http://localhost:3000/ADMIN/getAllClients', {
    method : "GET",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')
    }}
    ).then(response => response.json()).then(data => datos=data);
console.log(datos);
let usuarios=[]; //objeto 
let bandera= false;
//añade a usuario si es nuevo, sino le añade uno
for (let x = 0; x < datos.length; x++) { //por cada compra
    for (let y = 0; y < usuarios.length; y++) { 
        if(datos[x].user_id==usuarios[y].user){
            usuarios[y].cantidad = usuarios[y].cantidad +1;
            bandera = true;
        }
    }
    if(bandera ==true){
        bandera = false;
        continue;
    }
    usuarios.push({user: datos[x].user_id,cantidad: 1})
}
usuarios = sort(usuarios);
let nombres =[];
let cantidad =[];
for(let k=0;k<usuarios.length;k++){
    nombres.push(usuarios[k].user);
    cantidad.push(usuarios[k].cantidad);
}
nombres = await getNombres(nombres);//fetch
console.log(nombres);

const data = {
labels: nombres,
datasets: [{
    label: 'cantidad',
    backgroundColor: [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)'
    ],
    borderWidth:1,
    borderColor:'#777',
    hoverBorderWidth:3,
    hoverBorderColor:'#000',
    data: cantidad,
}]
};

const config = {
type: 'bar',//bar,bubble,doughnut,pie,line,radar
data: data,
options: {
    scales: {
    y: {
        max: Math.max.apply(Math, cantidad)+1,
        min: 0,
        ticks: {
            stepSize: 1
        }

        }
    },
    title:{
        display:true,
        text:'ID_vendedor vs cuanto ha vendido',
        fontSize:25
    },
    legend:{
        display:false, //parte de la derecha que dice quien es cada grafica
        position:'right',
        labels:{
        fontColor:'#000'
        }
    },
    layout:{
        padding:{
        left:50,
        right:0,
        bottom:0,
        top:0
        }
    },
    tooltips:{
        enabled:true
    }
    }
};

const myChart = new Chart(
document.getElementById('myChart'),
config
);
}
const getNombres = async (users_id) => {
let datos;
const x = await fetch('http://localhost:3000/ADMIN/getAllUsers', {
    method : "GET",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')
    }}
    ).then(response => response.json()).then(data => datos=data);
let retorno = [];
for(let j=0;j<users_id.length;j++){
    for(let i=0;i<datos.length;i++){
    if(users_id[j].user==datos[i].user){
        retorno.push(datos[j].username);
        break;
    }
    }
}
return retorno;
}
function sort(usuarios){
console.log(usuarios.length);
for(i=0;i<usuarios.length;i++){
    for(j=0;j<usuarios.length;j++){
    if(usuarios[i].cantidad>usuarios[j].cantidad){
        menor= usuarios[j];
        usuarios[j]= usuarios[i];
        usuarios[i] = menor;
    }
    }
}
return usuarios;
}

const verify=async()=>{
    let infoToken;
    let url = 'http://localhost:3000/decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.json()).then(data => infoToken=data);
    if(infoToken.rol!=3){
      window.location.replace("http://localhost:1234/");
    }
}

crearChart();  
