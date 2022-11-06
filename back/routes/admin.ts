import express, { NextFunction, Request, Response } from "express";
import {JwtPayload} from "jsonwebtoken";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from '../createDatabase' //Post
import {createToken,auth0} from "../auth/user"
const admin = express.Router();

export interface CustomRequest extends Request{
  token: string |JwtPayload;
}
admin.get('/prueba',createToken,async function(req:Request,res:Response){
  res.send(
    {token:(req as CustomRequest).token}  
  );
});
admin.get('/prueba2',auth0,async function(req:Request,res:Response){
  res.send(
    {auth:(req as CustomRequest).token}
  );
});

admin.get('/getAllUsers',async function(req:Request,res:Response){
    console.log("segundo");
    res.send(
      await getAllUser()
    );
  });
admin.get('/getAllClients',async function(req:Request,res:Response){
res.send(
    await getAllCompras()
    );
});
  

export default admin;