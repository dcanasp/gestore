import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import { type } from "os";
const prisma = new PrismaClient()

export const editUser = async (req:Request) =>{
    type usuarios ={
        nombre: string|undefined,
        clave: string|undefined,
        correo: string|undefined
    } 
    let nombre = req.query.username;
    let clave = req.query.password;
    let correo = req.query.email;
    //@ts-ignore
    let cambios:any = {};
    //let cambios: usuarios = {};
    if(nombre!=undefined){cambios.username = nombre}
    if(clave!=undefined){cambios.password = clave}
    if(correo!=undefined){cambios.email = correo}


    if (req.query && req.query.username) { nombre = (req.query as any).username; }  
    const addUsers = await prisma.usuario.update({ //insert into ... (SI LO CORREN OTRA VEZ SE VA A CREAR, aqui pondria las funciones de creacion de datos y nice)
        data:{
            username: nombre,
            password: clave,
            email: correo,
            }
        
        })
}