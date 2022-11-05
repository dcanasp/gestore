import express, { NextFunction, Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from '../createDatabase' //Post

const router = express.Router();


router.get('/', function (req, res) {
    res.send('esto es un servicio y se consume con un url destinado...');
  });
router.get('/checkUser/:username',async function(req:Request,res:Response){  
  res.send(
    //{existe: await getUser(req.query)}
    await getUser(req)  
    );
});
router.get('/checkUser',async function(req:Request,res:Response){
  
  res.send(
    "usuario No enviado, url dinamica..."  
    );
});

router.get('/getImages/:image_id',async function(req:Request,res:Response) {
res.send(
    await getImagen(req)
);
});
router.get('/getImages',async function(req:Request,res:Response) { //si no mandan el id igual vamos a entrar, para ir a la foto base
res.send(
    await getImagen(req)
);
});
router.get('/getAllProducts',async function(req:Request,res:Response){
    res.send(
      await getAllProducts() 
    );
});
  

export default router;