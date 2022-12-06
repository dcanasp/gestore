"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import passport from 'passport';
//import session from 'express-session';
const auth_1 = __importDefault(require("./auth"));
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
(0, auth_1.default)();
function test(req, res) {
    console.log("FUNCIONA");
    return true;
}
const google = (0, express_1.default)();
google.use(cors());
google.get('/', (req, res) => {
    res.send('<a href="/GOOGLE/auth/google">Sonido</a>');
});
google.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));
google.get('/google/callback', passport.authenticate('google', { session: false }, function (req, res) {
    test(req, res),
        {
            successRedirect: '/protected',
            failureRedirect: '/auth/failure',
        };
}
//res.send('hola');
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
exports.default = google;
