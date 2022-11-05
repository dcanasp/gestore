//npm run tsc
//node build/routes.js

//npx prisma db pull
import express, { NextFunction, Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from './getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from './createDatabase' //Post
import { products,client,image } from "./types"; //basura pero lo dejo como vestijio por si lo tenemos que volver a hacer
  //await ... as products
import router from "./routes/All";


const app = express();
//const app: express.Application = express();

app.use(express.json());

//app.use(logger);
//node types y express types



app.get('/getAllUsers',middle,async function(req:Request,res:Response){
  console.log("segundo");
  res.send(
    //await getAllUser() 
    "si"
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

function logger(req:Request,res:Response,next:NextFunction){
    console.log("prueba");
    next();
    return;
}
function middle(req:Request,res:Response,next:NextFunction){
  console.log("prueba middle");
  console.log(req.query.usuario);
  if(req.query.usuario=="admin"){
    console.log("ayuda");
    req.query.usuario="FUNCIONA";
    next();//si esta autenticado continue
    return;
  }
  next();
  return;
}


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