import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import { type } from "os";
const prisma = new PrismaClient()

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
    return "usuario creado";
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