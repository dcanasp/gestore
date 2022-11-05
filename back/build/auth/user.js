"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middle = void 0;
const jwt = require('jsonwebtoken');
function middle(req, res, next) {
    console.log("prueba middle");
    console.log(req.query.usuario);
    if (req.query.usuario == "admin") {
        console.log("ayuda");
        req.query.usuario = "FUNCIONA";
        next(); //si esta autenticado continue
        return;
    }
    next();
    return;
}
exports.middle = middle;
