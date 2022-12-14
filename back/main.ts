//npm run tsc
//node build/routes.js

//npx prisma db pull
//npx prisma generate
import express, { NextFunction, Request, Response } from "express";
import { products,client,image } from "./types"; //basura pero lo dejo como vestijio por si lo tenemos que volver a hacer
import general from "./routes/All";
import buy from "./routes/buyer";
import sell from "./routes/seller";
import admin from "./routes/admin";
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

app.use("/",general);
app.use("/BUY/",buy);
app.use("/SELL/",sell);
app.use("/ADMIN/",admin);


app.listen(3000, function () {
  console.log('el back esta corriendo en el puerto 3000, no olviden instanciar ambas terminales con front y back...');
});