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

export const editUser = async (req:Request) =>{
    try {
    type usuarios ={
        user_id: number,
        username: string,
        password: string,
        email: string
    } //si no llega un string (un undefined),salte a error
    let cambios = req.body as usuarios;

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
        nombre: string,
        descripcion: string,
        stock: number,
        precio: number,
    } //si no llega un string (un undefined),salte a error
    let cambios = req.body as product;

    const addProduct = await prisma.producto.update({
        where: {
            product_id:cambios.product_id,
          },
        data: {
            nombre: cambios.nombre,
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
            email: nuevo.email
        }
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
        precio: number
    } //si no llega un string (un undefined),salte a error
    let nuevo = req.body as product;

    const addProductos = await prisma.producto.create({
        data:{
            user_id: nuevo.user_id,
            image_id: nuevo.image_id,
            nombre: nuevo.nombre,
            descripcion: nuevo.descripcion,
            stock: nuevo.stock,
            precio: nuevo.precio,
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