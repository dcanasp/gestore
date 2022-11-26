import express, { Request, Response, NextFunction } from "express";
import {JwtPayload} from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
import { type } from "os";
import { Token } from "typescript";
import { createToken } from "./auth/user";
const prisma = new PrismaClient()

export interface CustomRequest extends Request{
    token: string |JwtPayload;
  }

type TokenVerificacion = {
    user_id: number,
    rol: number,
    iat: number,   
}

type TokenCreacion = {
    user_id: number,
    rol: number,
}

export const deleteUser = async (req:Request) =>{

    let userId = Number(req.query.user_id) 
  
    //Verificación usuario
    if((userId!=((req as CustomRequest).token as TokenVerificacion).user_id)&&(((req as CustomRequest).token as TokenVerificacion).rol!=3)){
      console.log(userId);
      console.log(((req as CustomRequest).token as TokenVerificacion).user_id)
      return "NO TIENE PERMISO POR TOKEN"
  }
  
    try {
        const remove = await prisma.usuario.update({
            where: {
                user_id:Number(req.query.user_id),
              },
            data: {
                estado:0,
                //TODO
            }
        
        });
        return "funciono, usuario eliminado ";
    }
    catch (err) {
        console.log(err);
    }
  }

export const editUser = async (req:Request) =>{
    try {
    type usuarios ={
        user_id: number,
        username: string,
        password: string,
        email: string
    } //si no llega un string (un undefined),salte a error
    let cambios = req.body as usuarios;

    //Verificación usuario
    if(cambios.user_id!=((req as CustomRequest).token as TokenVerificacion).user_id){
        console.log(cambios.user_id);
        console.log(((req as CustomRequest).token as TokenVerificacion).user_id)
        return "NO TIENE PERMISO POR TOKEN"
    }

    const addUsers = await prisma.usuario.update({
        where: {
            user_id:cambios.user_id,
          },
        data: {
            username: cambios.username,
            password: cambios.password,
            email: cambios.email,
        }
    
    });
    return "funciono, usuario cambiado";
    }
    catch (err) {
        console.log(err);
    }

}
export const editProduct = async (req:Request) =>{
    try {
    type product ={
        product_id: number,
        image_id:number,
        nombre: string,
        descripcion: string,
        stock: number,
        precio: number,
    } //si no llega un string (un undefined),salte a error
    let cambios = req.body as product;

    const seller = await getOneSeller(req.body.product_id);

    //Verificación usuario
    if((seller !=((req as CustomRequest).token as TokenVerificacion).user_id)&&(((req as CustomRequest).token as TokenVerificacion).rol!=3)){
        console.log(seller);
        console.log(((req as CustomRequest).token as TokenVerificacion).user_id)
        return "NO TIENE PERMISO POR TOKEN"
    }

    const addProduct = await prisma.producto.update({
        where: {
            product_id:cambios.product_id,
          },
        data: {
            nombre: cambios.nombre,
            image_id: cambios.image_id,
            descripcion: cambios.descripcion,
            stock: cambios.stock,
            precio: cambios.precio,
        }
    
    });
    return "funciono, producto cambiado";
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

export const getOneUser = async (username:string) => {
    try{
      const allUsers = await prisma.usuario.findFirst({ //select * from prisma.TABLE where user_id=1
        where: {
          username:username
        }
    })
      return allUsers?.user_id;
    
    }
    catch(e:any){
      console.error(e);
      await prisma.$disconnect();
      return false;
    }
  }
  

export const createUser = async (req:Request) =>{
    try {
    type usuarios ={
        username: string,
        password: string,
        rol: number,
        email: string
    } //si no llega un string (un undefined),salte a error
    let nuevo = req.body as usuarios;
    const addUsers = await prisma.usuario.create({
        data:{
            username: nuevo.username,
            password: nuevo.password,
            rol: nuevo.rol,
            email: nuevo.email,
            estado: 1,
        }
        //TODO
    });
    //@ts-ignore
    let importantes: TokenCreacion= {user_id: await getOneUser(nuevo.username) ,rol:nuevo.rol} 
    return await createToken(importantes);
    }
    catch (err) {
        console.log(err);
    }
}
export const createProduct = async (req:Request) =>{
    try {
    type product ={
        user_id: number,
        image_id: number,
        nombre: string,
        descripcion: string,
        stock: number,
        precio: number,
        categoria: number
    } //si no llega un string (un undefined),salte a error
    let nuevo = req.body as product;

    //Verificación usuario
    if(nuevo.user_id !=((req as CustomRequest).token as TokenVerificacion).user_id){
        console.log(nuevo.user_id);
        console.log(((req as CustomRequest).token as TokenVerificacion).user_id)
        return "NO TIENE PERMISO POR TOKEN"
    }

    const addProductos = await prisma.producto.create({
        data:{
            user_id: nuevo.user_id,
            image_id: nuevo.image_id,
            nombre: nuevo.nombre,
            descripcion: nuevo.descripcion,
            stock: nuevo.stock,
            precio: nuevo.precio,
            categoria: nuevo.categoria,
        }
        
    });  
    return "producto creado";
    }
    catch (err) {
        console.log(err);
    }
}
export const createCompra = async (req:Request) =>{
    try {
    type compra ={
        compra_id: number,
        user_id: number,
        fecha: string,//new Date()
        product_id: number,
    }
    let nuevo = req.body as compra;
    //FINAL FINAL FINAL
    if(nuevo.user_id!=((req as CustomRequest).token as TokenVerificacion).user_id){
        console.log(nuevo.user_id);
        console.log(((req as CustomRequest).token as TokenVerificacion).user_id)
        return "NO TIENE PERMISO POR TOKEN"
    }
    const getCompra = await prisma.compra.create({ //insert into ... (SI LO CORREN OTRA VEZ SE VA A CREAR, aqui pondria las funciones de creacion de datos y nice)
        data:{
          compra_id: nuevo.compra_id,
          user_id: nuevo.user_id,
          fecha: nuevo.fecha,
          product_id: nuevo.product_id,
        }
          
    });      
    return "producto creado";
    }
    catch (err) {
        console.log(err);
    }
}

export const pruebaPost = (req:Request, res:Response) => {
    //console.log(req.body);
    
    return (req.body as JSON)
}