import express, { NextFunction, Request, Response } from "express";
import {JwtPayload} from "jsonwebtoken";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from '../createDatabase' //Post
import { auth0 } from "../auth/user";

const buy = express.Router();
 
export interface CustomRequest extends Request{
  token: string |JwtPayload;
}

buy.post('/createCompra',auth0,async (req:Request,res:Response,next:NextFunction) => {
  res.send(
    await createCompra(req)//MAL HECHO
    );
  });

  

export default buy;