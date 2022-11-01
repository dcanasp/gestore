import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import { type } from "os";
const prisma = new PrismaClient()

export const editUser = async (req:Request) =>{
    try {
    type usuarios ={
        username: string,
        password: string,
        email: string
    } //si no llega un string (un undefined),salte a error
    let cambios = req.body as usuarios;

    const addUsers = await prisma.usuario.update({
        data: {
            username: cambios.username,
            password: cambios.password,
            email: cambios.email,
        },
        where: {
            user_id:5
          },
    
    });
    
    const users = await prisma.usuario.findFirst({ //encuentre el primero
        where: {
          //@ts-ignore //si toca...
          username: 5,
        }
  //NO SE HACER TYPADO
    });
    console.log(users);
  
    return "funciono, usuario cambiado";
    }
    catch (err) {
        console.log(err);
    }

}

export const pruebaPost = (req:Request, res:Response) => {
    //console.log(req.body);
    
    return (req.body as JSON)
}