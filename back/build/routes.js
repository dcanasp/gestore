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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npx prisma db pull
const express_1 = __importDefault(require("express"));
const getDatabase_1 = require("./getDatabase"); //lectura
const createDatabase_1 = require("./createDatabase");
//await ... as products
const app = (0, express_1.default)();
//const app: express.Application = express();
app.use(express_1.default.json());
//node types y express types
app.get('/', function (req, res) {
    res.send('esto es un servicio y se consume con un url destinado...');
});
app.get('/checkUser/:username', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(
        //{existe: await getUser(req.query)}
        yield (0, getDatabase_1.getUser)(req));
    });
});
app.get('/checkUser', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("usuario No enviado, url dinamica...");
    });
});
app.get('/getImages/:image_id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getImagen)(req));
    });
});
app.get('/getImages', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getImagen)(req));
    });
});
app.get('/getAllUsers', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getAllUser)());
    });
});
app.get('/getAllProducts', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getAllProducts)());
    });
});
app.get('/getAllClients', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getAllCompras)());
    });
});
app.get('/getAllImages', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getAllImages)());
    });
});
app.post('/pruebaPost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.editUser)(req));
}));
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
