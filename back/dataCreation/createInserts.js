function marcas() {
    let marcas = ["amd","nvidia","corsair","kingston","advantech","aopen","biostar","fic","intel","intel","tyan","xfx","via","zotac","petro","acer", "asus", "dell", "hp", "lenovo", "msi"];
    let nombreCompleto = marcas[Math.floor(Math.random() * marcas.length)] + quitarComillas(palabrasGenerator()) + "@" + Math.floor(Math.random() * 45)
    return '"' +nombreCompleto+ '"';
  }
  function nombres(inicio){
    return '"' +inicio + quitarComillas(palabrasGenerator()) + "-" + Math.floor(Math.random() * 3000 +15)+'"';
  }
  function booleanos(){
    return (Math.floor(Math.random() * 2) ) == 1; 
  }
  
  function numerosRaw(min,max){
    return (Math.random() * 100-2 + 2).toFixed(2);
  }
  function quitarComillas(texto){
      return texto.substring(1,texto.length-1);
  }
  
  function palabrasGenerator() {//envieme una palabra al azar, de maximo 14 minimo 4 letras 
    let arreglo = ["dataset", "abcdefghijklmnopqrstuvwxyz", "abcdefghijklmnopqrstuvwxyz", "abcdefghijklmnopqrstuvwxyz", "abcdefghijklmnopqrstuvwxyz", "abcdefghijklmnopqrstuvwxyz", "universidad", "sistemas", "123456789", "123456789", "123456789", "123456789", "7524", "99", "10", "2003", "david", "alfonso", "cañas", "palomino"]
    //let respuestas = [];
    //for (let i = 0; i < n; i++) {
      let palabra = "";
      for (let j = 0; j < Math.floor(Math.random() * 10) + 4; j++) {
        let x = Math.floor(Math.random() * arreglo.length);
        let txt = arreglo[x];
        palabra = palabra + String(txt.charAt(Math.floor(Math.random() * txt.length)));
      }
      return '"' + palabra + '"'; 
      //respuestas.push(palabra);
    //}
    //return respuestas
  
  }
  function exponente2(){
    let arreglo = [2,4,8,1632,64];
    return arreglo[Math.floor(Math.random() * arreglo.length)]
  }
  function generarDiscos() {
    let arreglo = ["SSD", "HDD", "NMVE M2"];
    return '"' +arreglo[Math.floor(Math.random() * arreglo.length)]+'"'
  }
  function getDocumentoTipo() {
    let arreglo = ["CC", "PP", "CE"];
    return '"' +arreglo[Math.floor(Math.random() * arreglo.length)] + '"'
  }

function getApellido(){
    let apellido = ["RODRIGUEZ","GOMEZ","GONZALES","MARTINEZ","GARCIA","LOPEZ","HERNANDEZ","SANCHEZ","RAMIREZ","PEREZ","DIAS","MUNOZ","CASAS","CANAS","ALVAREZ","ROJAS","MORENO","JIMENEZ","MADRIGAL"];
    return '"' +apellido[Math.floor(Math.random() * apellido.length)]+" "+ apellido[Math.floor(Math.random() * apellido.length)] + '"'
}

function getNombre(){
    let nombre = ["LEOPOLDO","VIVIANE","ENRIQUETA","MAYME","FELIX","SILVESTER","PILAR","KALLIE","ALEASE","BINDY","AMANCIO","LULU","HARLAND","JORDON","RENATA","WINSLOW","STACIE","ROSA","LISELOTTE","VICTORIA","ALBINA","ABRAHAM","EMILIANA","JOSUE","GEREON","XIMENA","RUBINA","DEMETRIO","CECILIO","OTTILIE"];
    return '"' +nombre[Math.floor(Math.random() * nombre.length)]+" "+ nombre[Math.floor(Math.random() * nombre.length)] + '"'
}
function numeros(min,max){
      return Math.floor(Math.random() * max-min) + min;
    }
function getDocumento(){
    return Math.floor(Math.random() * 9999999999-1000000000) + 1000000000;
}

function getUsuario(){
    return Math.floor(Math.random() * 50-1) + 1;
}
function getMonto(){
    return Math.floor(Math.random() * 18-3) + 3;
}
function getFecha(){
    let year =  2022 - Math.floor(Math.random() * 5);
    let mes = Math.floor(Math.random() * 12-1) + 1;
    let dia = Math.floor(Math.random() * 30-1) + 1; 
    return '"'+year + '-'+ mes + '-' + dia + '"';

}

function crearUsuarios(){
    let variable = new Array();
    let inicio ='INSERT into usuarios (user_id,username,password,rol,created_on) values (';
    for(let i=0;i<30;i++){
        let temporal= inicio + getNombre() + ", " + getApellido() +", "+ getDocumentoTipo()+ ", "+ getDocumento() + ");";
        variable.push(temporal);
    }
    let texto;
    for(let i=0;i<30;i++){
        texto = texto + " "+variable[i];
    }
    console.log(texto);
}

function crearEmpleado(){
    let variable = new Array();
    let inicio ='INSERT into empleado (empleado_nombre, empleado_apellido) values (';
    for(let i=0;i<30;i++){
        let temporal= inicio + getNombre() + ", " + getFecha() + ", "  + getMonto()+");";
        variable.push(temporal);
    }
    let texto;
    for(let i=0;i<30;i++){
        texto = texto + " "+variable[i];
    }
    console.log(texto);
}

function crearSolicitud(){
    let variable = new Array();
    let inicio ='INSERT into solicitud (cliente_id, solicitud_fecha_radicacion,solicitud_monto) values (';
    for(let i=0;i<30;i++){
        let temporal= inicio + getUsuario() + ", "+ getFecha()+ ", " + getMonto()  + ");";
        variable.push(temporal);
    }
    let texto;
    for(let i=0;i<30;i++){
        texto = texto + " "+variable[i];
    }
    console.log(texto);


}

function ram(max){
    let arreglo = new Array(); 
    let inicio = '[';
    for(let i =0;i<max;i++){
        let temporal = ',{"capacidad":' + exponente2() + ',"arquitectura":' + palabrasGenerator() + ',"velocidad":' + numeros(1333,2133) +',"tasaTransferencia":' + palabrasGenerator() +',"id":' + i +',"nombre":'+ nombres("ram")+',"marca":' +marcas()+',"precio":' +numeros(300,2000) +"}";
        arreglo.push(temporal);
    }

    for(let i =0;i<max;i++){
        inicio = inicio + " "+arreglo[i]; 
    }
    inicio = inicio + "]"
    console.log(inicio);
}

function procesador(max){
    let arreglo = new Array(); 
    let inicio = '[';
    for(let i =0;i<max;i++){
        let temporal = ',{"generacion":' +numeros(5,12) + ',"nucleos":' + numeros(1,32) + ',"hilos":' + numeros(1,16) + ',"frecuencia":' + parseFloat(numerosRaw(2,7)) + ',"cache":'+ numeros(1000,5000) + ',"consumo":' +numeros(200,1300) + ',"graficaIntegrada":' +booleanos() + ',"id":' + i + ',"nombre":' + nombres("procesador") + ',"marca":' + marcas() + ',"precio":' + numeros(100,2000) + "}";
        arreglo.push(temporal);
    }

    for(let i =0;i<max;i++){
        inicio = inicio + " "+arreglo[i]; 
    }
    inicio = inicio + "]"
    console.log(inicio);
}


function grafica(max){
    let arreglo = new Array(); 
    let inicio = '[';
    for(let i =0;i<max;i++){
        let temporal = ',{"memoria":' +exponente2()+',"arquitectura":' +palabrasGenerator()+',"anchoBanda":' +exponente2() *32+',"frecuenciaBase":' +numeros(1600,2000)+',"frecuenciaOc":' +numeros(2001,5000)+',"consumo":' +numeros(1200,3000)+',"computo":' +numeros(1200,3000)+',"id":' +i+',"nombre":' +nombres("grafica")+',"marca":'+ marcas()+',"precio":'+ numeros(100,2000)+'}';
        arreglo.push(temporal);
    }

    for(let i =0;i<max;i++){
        inicio = inicio + " "+arreglo[i]; 
    }
    inicio = inicio + "]"
    console.log(inicio);
   }

function almacenamiento(max){
    let arreglo = new Array(); 
    let inicio = '[';
    for(let i =0;i<max;i++){
        let temporal = ',{"tipo":' +generarDiscos()+',"capacidad":' +numeros(1300,3000)+',"velLectura":' +numeros(200,5000)+',"velEscritura":' +numeros(200,1500)+',"id":' +i+',"nombre":' +nombres("almacenamiento")+',"marca":' +marcas()+',"precio":' +numeros(50,2000)+'}';
        arreglo.push(temporal);
    }

    for(let i =0;i<max;i++){
        inicio = inicio + " "+arreglo[i]; 
    }
    inicio = inicio + "]"
    console.log(inicio);
   
}

function board(max){
    compatibilidad = ["DDR","DDR2","DDR3","DDR4","DDR5"];
    let arreglo = new Array(); 
    let inicio = '[';
    for(let i =0;i<max;i++){
        let temporal = ',{"chipset":'+numeros(20,1000)+',"socket":'+ palabrasGenerator()+',"compatibilidadArqRam":' +'"'+compatibilidad[Math.floor(Math.random()*compatibilidad.length)]+'"'+',"maxRam":' +exponente2()*16+',"puertos":' +numeros(1,100)+',"id":' +i+',"nombre":' +nombres("board")+',"marca":' +marcas()+',"precio":' +numeros(100,2000)+'}';
        arreglo.push(temporal);
    }

    for(let i =0;i<max;i++){
        inicio = inicio + " "+arreglo[i]; 
    }
    inicio = inicio + "]"
    console.log(inicio);

}
//   almacenamiento(100000);
//   board(100000);
//   grafica(100000);
//   procesador(100000);
//   ram(100000);
 