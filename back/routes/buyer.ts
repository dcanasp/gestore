import express, { NextFunction, Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from '../createDatabase' //Post

const buy = express.Router();
 
buy.post('/createCompra',async (req:Request,res:Response) => {
    res.send(
      await createCompra(req)
      );
  });

  

export default buy;