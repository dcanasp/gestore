//npm run tsc
//node build/routes.js

//npx prisma db pull
import express, { Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from './getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from './createDatabase' //Post
import { products,client,image } from "./types"; //basura pero lo dejo como vestijio por si lo tenemos que volver a hacer
  //await ... as products

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({origin: 'http://localhost:1234'}));
//node types y express types
app.get('/', function (req, res) {
  res.send('esto es un servicio y se consume con un url destinado...');
});
app.get('/checkUser/:username',async function(req:Request,res:Response){  
  res.send(
    //{existe: await getUser(req.query)}
    await getUser(req)  
    );
});
app.get('/checkUser',async function(req:Request,res:Response){
  
  res.send(
    "usuario No enviado, url dinamica..."  
    );
});
app.get('/getImages/:image_id',async function(req:Request,res:Response) {
  res.send(
    await getImagen(req)
  );
});
app.get('/getImages',async function(req:Request,res:Response) { //si no mandan el id igual vamos a entrar, para ir a la foto base
  res.send(
    await getImagen(req)
  );
});


app.get('/getAllUsers',async function(req:Request,res:Response){
  res.send(
    await getAllUser() 
  );
});
app.get('/getAllProducts',async function(req:Request,res:Response){
  res.send(
    await getAllProducts() 
  );
});
app.get('/getAllClients',async function(req:Request,res:Response){

  res.send(
    await getAllCompras()
    );
});
app.get('/getAllImages',async function(req:Request,res:Response){
  res.send(
    await getAllImages()
    );
});
//------------------deberian estar separados
app.get('/deleteUser',async function(req:Request,res:Response){
  res.send(
    await deleteUser(req)
    );
});
app.get('/deleteProduct',async function(req:Request,res:Response){
  res.send(
    await deleteProduct(req)
    );
});
//------------------deberian estar separados
app.post('/editUser',async (req:Request,res:Response) => { //lo hago funcion fecla para diferenciarlos tbh
  res.send(
    await editUser(req)
    );  
});
app.post('/editProduct',async (req:Request,res:Response) => {
  res.send(
    await editProduct(req)
    );
});
//------------------deberian estar separados
app.post('/createUser',async (req:Request,res:Response) => {
  res.send(
    await createUser(req)
    );
});
app.post('/createProduct',async (req:Request,res:Response) => {
  res.send(
    await createProduct(req)
    );
});
app.post('/createCompra',async (req:Request,res:Response) => {
  res.send(
    await createCompra(req)
    );
});




//EXPRES BODY PARSE
//ya esta instalado desde la 4.16 esta dentro de express
//https://www.educative.io/answers/what-is-express-body-parser
/*
  const jsonParser = express.json()
  app.use(jsonParser);
*/
app.listen(3000, function () {
  console.log('el back esta corriendo en el puerto 3000, no olviden instanciar ambas terminales con front y back...');
});