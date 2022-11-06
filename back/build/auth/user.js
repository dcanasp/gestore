"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth0 = exports.createToken = void 0;
const process_1 = require("process");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
function createToken(req, res, next) {
    //le llega de la peticion  
    let user = { name: req.query.user_id, rol: req.query.rol };
    const accesToken = jsonwebtoken_1.default.sign(user, process_1.env.ACCESS_TOKEN_SECRET);
    console.log(accesToken);
    req.token = accesToken;
    next(); //si esta autenticado continue
    return;
}
exports.createToken = createToken;
function auth0(req, res, next) {
    var _a;
    try {
        //HEADER Authorization
        //Bearer TOKEN
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, process_1.env.ACCESS_TOKEN_SECRET);
        req.token = decoded;
        next();
    }
    catch (error) {
        res.status(401).send('Mala Autenticacion');
    }
}
exports.auth0 = auth0;
