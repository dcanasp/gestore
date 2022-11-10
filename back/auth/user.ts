import express, { NextFunction, Request, Response } from "express";
import { env } from 'process';
import jwt, { Secret,JwtPayload } from "jsonwebtoken";
const jwt2 = require('njwt')
require('dotenv').config();

//typado especial para que el token sea retornable
export interface CustomRequest extends Request{
  token: string |JwtPayload|null;
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
//YA NO ES MIDDLEWARE; CAMBIAR DE LUGAR
export function createToken(user:TokenCreacion){
  //le llega de la peticion  
  console.log(user);
  const accesToken = jwt.sign(user,env.ACCESS_TOKEN_SECRET as Secret);
  console.log(accesToken);
  //(req as CustomRequest).token= accesToken;
  return accesToken;
}
export function reDoToken(datos:TokenVerificacion,req:Request,next:NextFunction){
  //le llega de la peticion  
  let user = {user_id:datos.user_id,rol:datos.rol,iat:datos.iat};
  const accesToken = jwt.sign(user,env.ACCESS_TOKEN_SECRET as Secret);
  console.log(accesToken);
  (req as CustomRequest).token = accesToken;
 // next();//si esta autenticado continue
  return accesToken;
}

export function auth0(req:Request,res:Response,next:NextFunction){
  try {
    //HEADER Authorization
  //Bearer TOKEN
  const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
  if (!token) {
    throw new Error();
  }
  //const decoded = jwt.verify(token,env.ACCESS_TOKEN_SECRET as Secret);
  jwt2.verify(token, env.ACCESS_TOKEN_SECRET as Secret, (err: any, verifiedJwt: any) => {
    if(err){
      next()
      throw new Error();
    }else{
      (req as CustomRequest).token = verifiedJwt.body;
      console.log(verifiedJwt.body.username);
      next()
      return;
    }
  })

  // //AQUI AQUI
  // (req as CustomRequest).token = decoded;
  // next();
  // return;
  } catch (error) {
    res.status(401).send('Mala Autenticacion');  
    return;  
  }
    
}
