//npm install @prisma/client 
//npx prisma db pull
//npx prisma generate //el que hace que se actualicen las dependencias , despues de un pull
//@ts-ignore
//tipado se crea cuando me estan llegando datos que no se de donde provienen, entonces si en el front que esta poniendo el usuario, ahi si uso un objeto de typado (ver type.d.ts), en el caso de prisma que me trae los datos typados segun el schema no solo es necesario, sino esta jodiendo el programa (amenos que tomes en cuenta los mismos posibles errores como el null[], y todos esos casos)
//var?. -->siempre que no sea indefinido o nulo haga
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import { products,client,image } from "./types";
const prisma = new PrismaClient()

async function main() {

  const allUsers = await prisma.usuario.findMany({ //select * from prisma.TABLE where user_id=1
      where: {
        user_id:1
      },

  })
  console.dir(allUsers, { depth: null })

  //const allUsers = await prisma.usuario.findMany() //select * from prisma.TABLE... 
  //console.log(allUsers)


}

/*
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
*/

export const getUser = async (req:Request) =>{
  try {
    if(req==null || req==undefined || req.query.username==null ||req.query.username==undefined ){ //esto se pude resumir en users?.
      throw new Error("no tengo paremetros");
    }
    const users = await prisma.usuario.findFirst({ //encuentre el primero
      where: {
        //@ts-ignore //si toca...
        username: req.query.username,
      }

  })

  if(users==null || users==undefined || users.password==null ||users.password==undefined){ //esto se pude resumir en users?.
    throw new Error("usuario o parametro no existente");
  }

  if(req.query.password==users.password){
    console.log("si");
    return true;
  }
  throw new Error("clave incorrecta");
}
  

catch (e:any) {//no se pudo conectar a base de datos
  console.error(e);
  await prisma.$disconnect();
  return false;
  //process.exit(1);
};
}


export const getImagen = async (req: Request) => {
  try {
    if(!isNaN(Number(req.query.image_id))){
      throw new Error("error");
    }

    const oneImage = await prisma.imagen.findUnique ({ //esta buscando por llave primaria
    where:{
      image_id: Number(req.query.image)
    }
    })
      if (oneImage == undefined || oneImage==null){
      //si no esta imagen no encontrada
        let noEncontrado = await prisma.imagen.findUnique({
          where:{
            image_id: 0
          }
        })
        if(noEncontrado==null || noEncontrado==undefined){
          throw new Error("no hay imagen base");
        }
        return noEncontrado.image;
      }
    return oneImage.image;
}
catch(e){
  await prisma.$disconnect();
  console.log(e);
  return []
}

}

export const getAllUser = async () => {
  try{
    const allUsers = await prisma.usuario.findMany({

    })
    return allUsers;
  }
  catch(e){
    await prisma.$disconnect();
    return []
  }
}

export const getAllProducts =async () => { //TODO: no le pongaany a todo
  try {
    const allProducts = await prisma.producto.findMany({
    }) ;
    return allProducts;
  }
  catch(e){
    await prisma.$disconnect();
    return []
  }  
}

export const getAllCompras = async ()  => { //TODO: no le pongaany a todo
  try {
    const allCompras = await prisma.compra.findMany({ //select * from prisma.TABLE
    })
    return allCompras;
}
catch(e){
  await prisma.$disconnect();
  return []
}

}

export const getAllImages = async () => {
  try{
    const allimages = await prisma.imagen.findMany({

    })
    return allimages;
  }
  catch(e){
    await prisma.$disconnect();
    return []
  }
}

