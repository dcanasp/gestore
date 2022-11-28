"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getDatabase_1 = require("../getDatabase"); //lectura
const createDatabase_1 = require("../createDatabase"); //Post
const user_1 = require("../auth/user");
const general = express_1.default.Router();
general.get('/', function (req, res) {
    res.send('esto es un servicio y se consume con un url destinado...');
});
general.get('/rol', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getRol)(req));
    });
});
general.get('/decodeToken', user_1.auth0, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(req.token);
    });
});
general.get('/checkUser/:username', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send({ token: yield (0, getDatabase_1.getUser)(req, next) });
    });
});
general.get('/checkUser', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("usuario No enviado, url dinamica...");
    });
});
general.get('/getImages/:image_id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getImagen)(req));
    });
});
general.get('/getImages', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getImagen)(req));
    });
});
general.get('/getProduct/:product_id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getProduct)(req));
    });
});
general.get('/getAllProducts', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getAllProducts)());
    });
});
general.get('/getAllImages', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getAllImages)());
    });
});
general.post('/editUser', user_1.auth0, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.editUser)(req));
}));
general.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ token: yield (0, createDatabase_1.createUser)(req) });
}));
general.post('/pruebaPost', user_1.createToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.pruebaPost)(req, res));
}));
//MUCHO CUIDADO TOCA
general.post('/deleteUser', user_1.auth0, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, createDatabase_1.deleteUser)(req));
    });
});
general.get('/getUser/', user_1.auth0, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send({ token: yield (0, getDatabase_1.getUserEdit)(req.token.user_id) });
    });
});
exports.default = general;
