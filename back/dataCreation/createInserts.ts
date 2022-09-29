//npm install @prisma/client 
//npx prisma generate
//npx prisma db pull
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

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
const getNombre = () =>{
    let nombre = ["LEOPOLDO","VIVIANE","ENRIQUETA","MAYME","FELIX","SILVESTER","PILAR","KALLIE","ALEASE","BINDY","AMANCIO","LULU","HARLAND","JORDON","RENATA","WINSLOW","STACIE","ROSA","LISELOTTE","VICTORIA","ALBINA","ABRAHAM","EMILIANA","JOSUE","GEREON","XIMENA","RUBINA","DEMETRIO","CECILIO","OTTILIE"];
    return nombre[Math.floor(Math.random() * nombre.length)]+" "+ nombre[Math.floor(Math.random() * nombre.length)]
}
const getEmail = (nombre:string) =>{
    let dividido = nombre.split(" ");
    return dividido[0] + Math.floor(Math.random()*9999) + dividido[1]
}
const posibles = ["mouse","teclado","webCam","altavoces","cabeEternet","pantalla"];//que estamos vendiendo

const getProducto = () =>{
  return posibles[Math.floor(Math.random() * posibles.length)] 
}

const maximoUsuario = async () => {
  const allUsers = await prisma.usuario.findMany({ })

  return allUsers.length +1;
}
const logicaImagen = (producto:string) => {
    
  for(let i = 0; i < posibles.length; i++) {
    if(posibles[i] === producto) {
      return i*2 + 1;
    }
  }
  return 0; //imagen no encontrada 
};

const getDescripcion = (producto:string) => {
  let textoAzar = producto;
  for (let i = 0; i <8;i++) {
    textoAzar = textoAzar + " " + palabrasGenerator();
  }
  return textoAzar;
}

async function main() {
for(let i =0;i<15;i++){

    let nombre = getNombre();
    const addUsers = await prisma.usuario.create({ //insert into ... (SI LO CORREN OTRA VEZ SE VA A CREAR, aqui pondria las funciones de creacion de datos y nice)
    data:{
        username: nombre,
        password: '1234',
        rol:  Math.floor(Math.random()*2)+1,
        email: getEmail(nombre)
        }
    
    })

    let producto = getProducto();
    
    const addProductos = await prisma.producto.create({ //insert into ... (SI LO CORREN OTRA VEZ SE VA A CREAR, aqui pondria las funciones de creacion de datos y nice)
      data:{
          user_id: Math.floor(Math.random()* await maximoUsuario()),//es una promesa, NO UN DATO
          image_id: Math.floor(Math.random()*2 +logicaImagen(producto)),
          nombre: producto,
          descripcion: getDescripcion(producto),
          stock: Math.floor(Math.random()*30),
          precio: Math.floor(Math.random()*10000)+1,
          }
      
      })
    //lo llamo y sale
}

//1-2 mouse
//3-4 teclado
//5-6 webCam
//7-8 altavoces
//9-10 cable eternet
//11-12 pantallla    


    //const add //no se que añadir

  const allUsers = await prisma.usuario.findMany({ //select * from prisma.TABLE where user_id=1
      where: {
        user_id:1
      },

  })
  console.dir(allUsers, { depth: null })

  //const allUsers = await prisma.usuario.findMany() //select * from prisma.TABLE... 
  //console.log(allUsers)


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
