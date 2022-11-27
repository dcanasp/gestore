import express, { NextFunction, Request, Response } from "express";
import {getUser,getImagen,getAllUser,getAllProducts,getAllCompras,getAllImages,deleteProduct} from './getDatabase' //lectura
import {editProduct,editUser, createUser,createProduct,createCompra,pruebaPost,deleteUser} from './createDatabase' //Post
//import passport from 'passport';
//import session from 'express-session';
import auth from './auth'
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

export interface GoogleRequest extends Request{
    user: string ;
  }
auth();
function test(req:Request, res:Response) {
  console.log("FUNCIONA");
    return true;
  }

const google = express();
google.use(cors())
google.get('/', (req, res) => {
    res.send('<a href="/GOOGLE/auth/google">Sonido</a>');
  });

google.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email' ] }
));

google.get( '/google/callback',
    passport.authenticate( 'google',{session: false},function(req:any,res:any) {
        test(req,res),
            {
            successRedirect: '/protected',
            failureRedirect: '/auth/failure',
          }
        }
        //res.send('hola');
      
  //   { failureRedirect: '/login', failureMessage: true }),
  // function(req, res) {
  //   res.redirect('/'); 
  //   {
  //   successRedirect: '/protected',
  //   failureRedirect: '/auth/failure',
  // }
  //}
  ));

google.get('/auth/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });
  

  google.get('/protected', (req, res) => {
    res.send("funciona");
    //res.send(`Hello ${(req as GoogleRequest).user}`);
    //window.location.replace("http://localhost:1234/index-logged.html");
    
  });


  //google.get('/logout', (req, res) => {
    //req.logout();
   
    //res.send('Goodbye!');
  //})

export default google;