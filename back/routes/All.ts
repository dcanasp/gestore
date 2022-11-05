import express, { NextFunction, Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from '../createDatabase' //Post

const general = express.Router();


general.get('/', function (req, res) {
    res.send('esto es un servicio y se consume con un url destinado...');
  });
general.get('/checkUser/:username',async function(req:Request,res:Response){  
  res.send(
    //{existe: await getUser(req.query)}
    await getUser(req)  
    );
});
general.get('/checkUser',async function(req:Request,res:Response){
  
  res.send(
    "usuario No enviado, url dinamica..."  
    );
});

general.get('/getImages/:image_id',async function(req:Request,res:Response) {
res.send(
    await getImagen(req)
);
});
general.get('/getImages',async function(req:Request,res:Response) { //si no mandan el id igual vamos a entrar, para ir a la foto base
res.send(
    await getImagen(req)
);
});
general.get('/getAllProducts',async function(req:Request,res:Response){
    res.send(
      await getAllProducts() 
    );
});
general.get('/getAllImages',async function(req:Request,res:Response){
  res.send(
    await getAllImages()
    );
});  

general.post('/editUser',async (req:Request,res:Response) => { //lo hago funcion fecla para diferenciarlos tbh
  res.send(
    await editUser(req)
    );  
  });
general.post('/createUser',async (req:Request,res:Response) => {
  res.send(
    await createUser(req)
    );
});  
//MUCHO CUIDADO TOCA
general.get('/deleteUser',async function(req:Request,res:Response){
  res.send(
    await deleteUser(req)
    );
});
export default general;