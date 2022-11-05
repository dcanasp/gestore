//npm run tsc
//node build/routes.js

//npx prisma db pull
import express, { NextFunction, Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages, deleteUser,deleteProduct} from './getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost} from './createDatabase' //Post
import { products,client,image } from "./types"; //basura pero lo dejo como vestijio por si lo tenemos que volver a hacer
  //await ... as products
import general from "./routes/All";
import buy from "./routes/buyer";
import sell from "./routes/seller";
import admin from "./routes/admin";


const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({origin: 'http://localhost:1234'}));
//node types y express types

app.use("/USER/",general);
app.use("/BUY/",buy);
app.use("/SELL/",sell);
app.use("/ADMIN/",admin);




//------------------deberian estar separados


//------------------deberian estar separados

//------------------deberian estar separados



function logger(req:Request,res:Response,next:NextFunction){
    console.log("prueba");
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