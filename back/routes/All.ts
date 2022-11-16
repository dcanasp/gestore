import express, { NextFunction, Request, Response } from "express";
import {JwtPayload} from "jsonwebtoken";
import {getRol,getUser,getImagen,getProduct,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from '../getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from '../createDatabase' //Post
import {createToken,auth0} from "../auth/user"

export interface CustomRequest extends Request{
  token: string |JwtPayload;
}

type TokenVerificacion = {
  user_id: number,
  rol: number,
  iat: number,   
}

const general = express.Router();


general.get('/', function (req, res) {
    res.send('esto es un servicio y se consume con un url destinado...');
  });

general.get('/rol',async function(req:Request,res:Response){
  res.send(
    await getRol(req)
  );
});

general.get('/decodeToken',auth0,async function(req:Request,res:Response){
  res.send(
    ((req as CustomRequest).token as TokenVerificacion)
  );
});

general.get('/checkUser/:username',async function(req:Request,res:Response,next:NextFunction){  
  res.send(
    {token: await getUser(req,next)}  
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
general.get('/getProduct/:product_id',async function(req:Request,res:Response){
  res.send(
    await getProduct(req) 
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
    {token:await createUser(req)}
    );
}); 
general.post('/pruebaPost',createToken,async (req:Request,res:Response) => {
  res.send(
    await pruebaPost(req,res)
    );
}); 
//MUCHO CUIDADO TOCA
general.get('/deleteUser',auth0, async function(req:Request,res:Response){
  res.send(
    await deleteUser(req)
    );
});

export default general; 