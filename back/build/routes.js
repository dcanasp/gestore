"use strict";
//npm run tsc
//node build/routes.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//npx prisma db pull
const express = require("express");
const getDatabase_1 = require("./getDatabase");
// Create a new express application instance
const app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/checkUser', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(
        //{existe:getUser(req.query)}
        yield (0, getDatabase_1.getUser)(req.query));
    });
});
app.get('/getProducts', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getProducts)());
    });
});
app.get('/getClients', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getCompras)());
    });
});
app.get('/oneImage', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getImagen)(req.query));
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
