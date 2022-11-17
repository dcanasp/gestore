//npm install @prisma/client 
//npx prisma init
//npx prisma db pull
//npx prisma generate //el que hace que se actualicen las dependencias , despues de un pull
//@ts-ignore
//tipado se crea cuando me estan llegando datos que no se de donde provienen, entonces si en el front que esta poniendo el usuario, ahi si uso un objeto de typado (ver type.d.ts), en el caso de prisma que me trae los datos typados segun el schema no solo es necesario, sino esta jodiendo el programa (amenos que tomes en cuenta los mismos posibles errores como el null[], y todos esos casos)
//var?. -->siempre que no sea indefinido o nulo haga
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import {JwtPayload} from "jsonwebtoken";
import { products,client,image } from "./types";
import { createToken,reDoToken } from "./auth/user";
const prisma = new PrismaClient()

type TokenVerificacion = {
  user_id: number,
  rol: number,
  iat: number,   
}
export interface CustomRequest extends Request{
  token: string |JwtPayload;
}

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
export const getRol = async (req:Request) =>{
  try{
    if(req==null || req==undefined || req.params.username==null ||req.params.username==undefined ){ //esto se pude resumir en users?.
      throw new Error("no tengo paremetros");
    }
    const rol = await prisma.usuario.findFirst({ //encuentre el primero
      where: {//USERNAME IDIOTA
        username: req.params.username,
      }
    });
    return rol?.rol;
  }
  catch (e:any) {//no se pudo conectar a base de datos
    console.error(e);
    await prisma.$disconnect();
    return false;
    //process.exit(1);
  };
}
export const getUser = async (req:Request,next:NextFunction) =>{
  try {
    if(req==null || req==undefined || req.params.username==null ||req.params.username==undefined ){ //esto se pude resumir en users?.
      throw new Error("no tengo paremetros");
    }
    console.log(req.params.username)
    const users = await prisma.usuario.findFirst({ //encuentre el primero
      where: {//USERNAME IDIOTA
        username: req.params.username,
      }
  })
  if(users==null || users==undefined || users.password==null ||users.password==undefined){ //esto se pude resumir en users?.
    throw new Error("usuario o parametro no existente");
  }

  if(req.query.password==users.password){
    let datos: TokenVerificacion = {
      user_id:Number(users.user_id),
      rol:Number(await getRol(req)),
      iat: Date.now()
    }
    return reDoToken(datos,req,next);
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
    if(isNaN(Number(req.params.image_id))==true){
      throw new Error("id no numerico");
    }
    const oneImage = await prisma.imagen.findUnique ({ //esta buscando por llave primaria
    where:{
      image_id: Number(req.params.image_id)
    }
    })
      if (oneImage == undefined || oneImage==null){
        throw new Error("no hay imagen, se pone la base");
      }
    return oneImage.image;
}
catch(e){
  try{
    let noEncontrado = await prisma.imagen.findUnique({
      where:{
        image_id: 0
      }
    })
    if(noEncontrado==null || noEncontrado==undefined){
      throw new Error("no hay imagen 0, base datos desconectada");
    }
    return noEncontrado.image;

  }
  catch(e){
    await prisma.$disconnect();
    console.log(e);
    return;
  }
}

}

export const getProduct = async (req: Request) => {
  try {
    if(isNaN(Number(req.params.product_id))==true){
      throw new Error("id no numerico");
    }
    const oneProduct = await prisma.producto.findUnique ({ //esta buscando por llave primaria
    where:{
      product_id: Number(req.params.product_id)
    }
    })
    return oneProduct;
}
catch(e){
    await prisma.$disconnect();
    console.log(e);
    return;
}

}

export const getProductSell = async (req: Request) => {
  try {
    //Verificación usuario
    if(Number(req.params.user_id) !=((req as CustomRequest).token as TokenVerificacion).user_id){
        console.log(Number(req.params.user_id));
        console.log(((req as CustomRequest).token as TokenVerificacion).user_id)
        return "NO TIENE PERMISO POR TOKEN"
    }

    if(isNaN(Number(req.params.user_id))==true){
      throw new Error("id no numerico");
    }
    const productsSell = await prisma.producto.findMany ({ //esta buscando por llave primaria
    where:{
      user_id: Number(req.params.user_id)
    }
    })
    return productsSell;
}
catch(e){
    await prisma.$disconnect();
    console.log(e);
    return;
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


export const deleteUser = async (req:Request) =>{

  let userId = Number(req.query.user_id) 

  //Verificación usuario
  if(userId!=((req as CustomRequest).token as TokenVerificacion).user_id){
    console.log(userId);
    console.log(((req as CustomRequest).token as TokenVerificacion).user_id)
    return "NO TIENE PERMISO POR TOKEN"
}

  try {
    const deleteUser = await prisma.usuario.delete({
      where: {
          user_id: Number(req.query.user_id),
        },
  });
  return "persona eliminada";
  }
  catch (err) {
      console.log(err);
  }
}
export const deleteProduct = async (req:Request) =>{
  
   try {
     
    const seller = await getOneSeller(req.body.product_id);

  //Verificación usuario
  if((seller !=((req as CustomRequest).token as TokenVerificacion).user_id)&&(((req as CustomRequest).token as TokenVerificacion).rol!=3)){
    console.log(seller);
    console.log(((req as CustomRequest).token as TokenVerificacion).user_id)
    return "NO TIENE PERMISO POR TOKEN"
}

    const deleteUser = await prisma.producto.delete({
      where: {
          product_id: Number(req.query.product_id),
        },
  });
  return "producto eliminado";
  }
  catch (err) {
      console.log(err);
  }
}

export const getOneSeller = async (product_id:number) => {
  try{
    const allUProducts = await prisma.producto.findFirst({ //select * from prisma.TABLE where user_id=1
      where: {
        product_id:product_id
      }
  })
    return allUProducts?.user_id;
  
  }
  catch(e:any){
    console.error(e);
    await prisma.$disconnect();
    return false;
  }
}