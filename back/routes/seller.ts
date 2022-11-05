import express, { NextFunction, Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from '../createDatabase' //Post

const sell = express.Router();
 

sell.post('/editProduct',async (req:Request,res:Response) => {
    res.send(
      await editProduct(req)
      );
  });
sell.post('/createProduct',async (req:Request,res:Response) => {
res.send(
    await createProduct(req)
    );
});
sell.get('/deleteProduct',async function(req:Request,res:Response){
    res.send(
      await deleteProduct(req)
    );
});

export default sell;