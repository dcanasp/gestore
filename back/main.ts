//npm run tsc
//node build/routes.js

//npx prisma db pull
import express, { NextFunction, Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from './getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from './createDatabase' //Post
import { products,client,image } from "./types"; //basura pero lo dejo como vestijio por si lo tenemos que volver a hacer
import general from "./routes/All";
import buy from "./routes/buyer";
import sell from "./routes/seller";
import admin from "./routes/admin";
//import cors from "cors";
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())
// app.use(cors(
//   {
//   origin: '*',
//   }
//   ));

app.use("/",general);
app.use("/BUY/",buy);
app.use("/SELL/",sell);
app.use("/ADMIN/",admin);

//node types y express types  
function logger(req:Request,res:Response,next:NextFunction){
    console.log("prueba");
    next();
    return;
}

app.listen(3000, function () {
  console.log('el back esta corriendo en el puerto 3000, no olviden instanciar ambas terminales con front y back...');
});