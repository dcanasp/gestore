import express, { NextFunction, Request, Response } from "express";
import {JwtPayload} from "jsonwebtoken";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages,deleteProduct, getProductSell} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost,deleteUser} from '../createDatabase' //Post
import { auth0 } from "../auth/user";

const sell = express.Router();

type TokenVerificacion = {
  user_id: number,
  rol: number,
  iat: number,   
}

export interface CustomRequest extends Request{
  token: string |JwtPayload;
}

sell.post('/editProduct',auth0,async (req:Request,res:Response) => {
  if(!rolVerified2((req as CustomRequest).token as TokenVerificacion)){
    res.send(console.error());
  }else{
    res.send(
        await editProduct(req)
        );
    
  }
  });
sell.post('/createProduct',auth0,async (req:Request,res:Response) => {
  if(!rolVerified((req as CustomRequest).token as TokenVerificacion)){
    res.send(console.error());
  }else{
    res.send(
        await createProduct(req)
        );

  }
  });
sell.get('/deleteProduct',auth0,async function(req:Request,res:Response){
  
  
  if(!rolVerified((req as CustomRequest).token as TokenVerificacion)){
    res.send(console.error());
  }else{
    res.send(
      await deleteProduct(req)
    );
  }
});

sell.get('/getProducts/:user_id',auth0,async function(req:Request,res:Response){
  if(!rolVerified((req as CustomRequest).token as TokenVerificacion)){
    res.status(400).send("Rol no permitido");
  }else{
    res.send(
      await getProductSell(req) 
      );
  }
});

function rolVerified(token: TokenVerificacion){
  if(token.rol!=2){
    
    console.log(token.rol);
    
    return false;
}
return true;
}

function rolVerified2(token: TokenVerificacion){
  if(token.rol==1){
    
    console.log(token.rol);
    
    return false;
}
return true;
}

export default sell;