import express, { NextFunction, Request, Response } from "express";
import { env } from 'process';
import jwt, { Secret,JwtPayload } from "jsonwebtoken";
require('dotenv').config();

//typado especial para que el token sea retornable
export interface CustomRequest extends Request{
  token: string |JwtPayload;
}
export function createToken(req:Request,res:Response,next:NextFunction){
  //le llega de la peticion  
  let user = {name:req.query.user_id,rol:req.query.rol};
  const accesToken = jwt.sign(user,env.ACCESS_TOKEN_SECRET as Secret);
  console.log(accesToken);
  (req as CustomRequest).token= accesToken;
  next();//si esta autenticado continue
  return ;
}

export function auth0(req:Request,res:Response,next:NextFunction){
  try {
    //HEADER Authorization
  //Bearer TOKEN
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new Error();
  }
  type prueba ={
    token: String|Request|JwtPayload
  };

  const decoded = jwt.verify(token,env.ACCESS_TOKEN_SECRET as Secret);
  (req as CustomRequest).token = decoded;
  next();
  
  } catch (error) {
    res.status(401).send('Mala Autenticacion');    
  }
    
}
