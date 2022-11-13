import express, { NextFunction, Request, Response } from "express";
import {JwtPayload} from "jsonwebtoken";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from '../createDatabase' //Post
import {createToken,auth0} from "../auth/user"
const cors = require('cors');
const admin = express.Router();


admin.use(cors())

type TokenVerificacion = {
  user_id: number,
  rol: number,
  iat: number,   
}

export interface CustomRequest extends Request{
  token: string |JwtPayload;
}
admin.get('/prueba',createToken,async function(req:Request,res:Response){
  if(!rolVerified((req as CustomRequest).token as TokenVerificacion)){
    res.send(console.error());
  }
  res.send(
    {token:(req as CustomRequest).token}  
  );
});
admin.get('/prueba2',auth0,async function(req:Request,res:Response){
  if(!rolVerified((req as CustomRequest).token as TokenVerificacion)){
    res.send(console.error());
  }
  res.send(
    {auth:(req as CustomRequest).token}
  );
});

admin.get('/getAllUsers',auth0,async function(req:Request,res:Response){
  if(!rolVerified((req as CustomRequest).token as TokenVerificacion)){
    res.status(400).send("Rol no permitido");
  }else{
    console.log("segundo");
    res.send(
      await getAllUser()
    );
  }
    
  });
admin.get('/getAllClients',auth0,async function(req:Request,res:Response){
  if(!rolVerified((req as CustomRequest).token as TokenVerificacion)){
    res.status(400).send("Rol no permitido");
  }else{
    res.send(
      await getAllCompras()
      );
  }

});

function rolVerified(token: TokenVerificacion){
  if(token.rol!=3){
    console.log(token.rol);
    return false;
}
return true;
}
  

export default admin;