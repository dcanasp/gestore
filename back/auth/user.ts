import express, { NextFunction, Request, Response } from "express";


const jwt = require('jsonwebtoken');


export function middle(req:Request,res:Response,next:NextFunction){
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