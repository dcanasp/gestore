"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth0 = exports.reDoToken = exports.createToken = void 0;
const process_1 = require("process");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt2 = require('njwt');
require('dotenv').config();
//YA NO ES MIDDLEWARE; CAMBIAR DE LUGAR
function createToken(user) {
    //le llega de la peticion  
    console.log(user);
    const accesToken = jsonwebtoken_1.default.sign(user, process_1.env.ACCESS_TOKEN_SECRET);
    console.log(accesToken);
    //(req as CustomRequest).token= accesToken;
    return accesToken;
}
exports.createToken = createToken;
function reDoToken(datos, req, next) {
    //le llega de la peticion  
    let user = { user_id: datos.user_id, rol: datos.rol, iat: datos.iat };
    const accesToken = jsonwebtoken_1.default.sign(user, process_1.env.ACCESS_TOKEN_SECRET);
    console.log(accesToken);
    req.token = accesToken;
    // next();//si esta autenticado continue
    return accesToken;
}
exports.reDoToken = reDoToken;
function auth0(req, res, next) {
    var _a;
    try {
        //HEADER Authorization
        //Bearer TOKEN
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        //const decoded = jwt.verify(token,env.ACCESS_TOKEN_SECRET as Secret);
        jwt2.verify(token, process_1.env.ACCESS_TOKEN_SECRET, (err, verifiedJwt) => {
            if (err) {
                next();
                throw new Error();
            }
            else {
                req.token = verifiedJwt.body;
                next();
                return;
            }
        });
        // //AQUI AQUI
        // (req as CustomRequest).token = decoded;
        // next();
        // return;
    }
    catch (error) {
        console.log(error);
        res.status(401).send('Mala Autenticacion');
        return;
    }
}
exports.auth0 = auth0;
