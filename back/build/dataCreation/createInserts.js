"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//npm install @prisma/client 
//npx prisma generate
//npx prisma db pull
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function palabrasGenerator() {
    let arreglo = ['dataset', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'universidad', 'sistemas', '123456789', '123456789', '123456789', '123456789', '7524', '99', '10', '2003', 'david', 'alfonso', 'cañas', 'palomino'];
    //let respuestas = [];
    //for (let i = 0; i < n; i++) {
    let palabra = "";
    for (let j = 0; j < Math.floor(Math.random() * 10) + 4; j++) {
        let x = Math.floor(Math.random() * arreglo.length);
        let txt = arreglo[x];
        palabra = palabra + String(txt.charAt(Math.floor(Math.random() * txt.length)));
    }
    return palabra;
    //respuestas.push(palabra);
    //}
    //return respuestas
}
const getNombre = () => {
    let nombre = ["LEOPOLDO", "VIVIANE", "ENRIQUETA", "MAYME", "FELIX", "SILVESTER", "PILAR", "KALLIE", "ALEASE", "BINDY", "AMANCIO", "LULU", "HARLAND", "JORDON", "RENATA", "WINSLOW", "STACIE", "ROSA", "LISELOTTE", "VICTORIA", "ALBINA", "ABRAHAM", "EMILIANA", "JOSUE", "GEREON", "XIMENA", "RUBINA", "DEMETRIO", "CECILIO", "OTTILIE"];
    return nombre[Math.floor(Math.random() * nombre.length)] + " " + nombre[Math.floor(Math.random() * nombre.length)];
};
const getEmail = (nombre) => {
    let dividido = nombre.split(" ");
    return dividido[0] + Math.floor(Math.random() * 9999) + dividido[1] + "@gmail.com";
};
const posibles = ["mouse", "teclado", "webCam", "altavoces", "cabeEternet", "pantalla"]; //que estamos vendiendo
const getProducto = () => {
    return posibles[Math.floor(Math.random() * posibles.length)];
};
const maximoUsuario = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.usuario.findMany({});
    return allUsers.length + 1;
});
const maximoProducto = () => __awaiter(void 0, void 0, void 0, function* () {
    const allProducts = yield prisma.producto.findMany({});
    return allProducts.length + 1;
});
const logicaImagen = (producto) => {
    for (let i = 0; i < posibles.length; i++) {
        if (posibles[i] === producto) {
            return i * 2 + 1;
        }
    }
    return 0; //imagen no encontrada 
};
const getDescripcion = (producto) => {
    let textoAzar = producto;
    for (let i = 0; i < 8; i++) {
        textoAzar = textoAzar + ' ' + palabrasGenerator();
    }
    return textoAzar;
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // const allUsers = await prisma.usuario.findMany() //select * from prisma.TABLE... 
        // console.log(allUsers)
        for (let i = 1; i < 35; i++) {
            console.log(i);
            /*
            
              let nombre = getNombre();
              const addUsers = await prisma.usuario.create({ //insert into ... (SI LO CORREN OTRA VEZ SE VA A CREAR, aqui pondria las funciones de creacion de datos y nice)
              data:{
                  username: nombre,
                  password: '1234',
                  rol:  Math.floor(Math.random()*2)+1,
                  email: getEmail(nombre)
                  }
              
              })
            
            const addImagen = await prisma.imagen.create({
              data:{
                image: 'todo',
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
                    categoria: (logicaImagen(producto)-1)/2
                    }
                
                })
            */
            const getCompra = yield prisma.compra.create({
                data: {
                    user_id: Math.ceil(Math.random() * (yield maximoUsuario())),
                    fecha: (new Date()).toString(),
                    product_id: Math.ceil(Math.random() * (yield maximoProducto())),
                }
            });
        }
    });
}
//1-2 mouse
//3-4 teclado
//5-6 webCam
//7-8 altavoces
//9-10 cable eternet
//11-12 pantallla
//const add //no se que añadir
/*
  const allUsers = await prisma.usuario.findMany({ //select * from prisma.TABLE where user_id=1
      where: {
        user_id:1
      },

  })
  console.dir(allUsers, { depth: null })

  //const allUsers = await prisma.usuario.findMany() //select * from prisma.TABLE...
  //console.log(allUsers)


}
*/
main().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
