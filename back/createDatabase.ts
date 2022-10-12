import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import { type } from "os";
const prisma = new PrismaClient()

export const editUser = async (req:Request) =>{
    try {
    type usuarios ={
        username: string|undefined,
        password: string|undefined,
        email: string|undefined
    } 
    let nombre = req.query.nombre;
    let clave = req.query.clave;
    let correo = req.query.correo;
    let cambios  = {}as usuarios;
    //let cambios: usuarios = {};
    //URGENTE: ARREGLAR
    //@ts-ignore
    if(nombre!=undefined){cambios.username = nombre}
    //@ts-ignore
    if(clave!=undefined){cambios.password = clave}
    //@ts-ignore
    if(correo!=undefined){cambios.email = correo}


    if (req.query==undefined || req.query.username==undefined) {throw new Error(" aprenda a hacer un post");}  
    // const addUsers = await prisma.usuario.update({ //insert into ... (SI LO CORREN OTRA VEZ SE VA A CREAR, aqui pondria las funciones de creacion de datos y nice)
        
        // data:{
        //     //quien putas la declara???
        //     username: nombre,
        //     password: clave,
        //     email: correo,
        //     }
        
        // })
    }
    catch (err) {
        console.log(err);
    }

}

export const pruebaPost = (req:Request, res:Response) => {
    
    
    return (req.body.data as any)
}
//https://postman-echo.com/post