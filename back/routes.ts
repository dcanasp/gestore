//npm run tsc
//node build/routes.js

//npx prisma db pull
import express, { Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages} from './getDatabase' //lectura
import {} from './createDatabase'
import { products,client,image } from "./types"; //basura pero lo dejo como vestijio por si lo tenemos que volver a hacer
  //await ... as products

const app = express();
//const app: express.Application = express();

//node types y express types
app.get('/', function (req, res) {
  res.send('esto es un servicio y se consume con un url destinado...');
});
app.get('/checkUser',async function(req:Request,res:Response){
  res.send(
    //{existe: await getUser(req.query)}
    await getUser(req)  
    );
});
app.get('/getImages',async function(req:Request,res:Response) {
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
app.post('/pruebaPost',async (req:Request,res:Response) => { //lo hago funcion fecla para diferenciarlos tbh
  
})

app.listen(3000, function () {
  console.log('el back esta corriendo en el puerto 3000, no olviden instanciar ambas terminales con front y back...');
});