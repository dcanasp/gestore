import express, { NextFunction, Request, Response } from "express";
import {JwtPayload} from "jsonwebtoken";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost,deleteUser} from '../createDatabase' //Post
import { auth0 } from "../auth/user";

type TokenVerificacion = {
  user_id: number,
  rol: number,
  iat: number,   
}

const buy = express.Router();
 
export interface CustomRequest extends Request{
  token: string |JwtPayload;
}

buy.post('/createCompra',auth0,async (req:Request,res:Response,next:NextFunction) => {

  if(!rolVerified((req as CustomRequest).token as TokenVerificacion)){
    res.send(console.error());
  }else{
    
    res.send(
      await createCompra(req)
      );
  }

  });

function rolVerified(token: TokenVerificacion){
  if(token.rol!=1){
    console.log(token.rol);
    return false;
}
return true;
}
  

export default buy;