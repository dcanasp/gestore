


import express, { NextFunction, Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from '../createDatabase' //Post
import {middle} from "../auth/user"
const admin = express.Router();
 

admin.get('/getAllUsers',middle,async function(req:Request,res:Response){
    console.log("segundo");
    res.send(
      //await getAllUser() 
      "si"
    );
  });
admin.get('/getAllClients',async function(req:Request,res:Response){
res.send(
    await getAllCompras()
    );
});
  

export default admin;