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
const createDatabase_1 = require("./createDatabase"); //Post
//await ... as products
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors({ origin: 'http://localhost:1234' }));
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
app.get('/getAllUsers', middle, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("segundo");
        res.send(
        //await getAllUser() 
        "si");
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
//------------------deberian estar separados
app.get('/deleteUser', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.deleteUser)(req));
    });
});
app.get('/deleteProduct', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.deleteProduct)(req));
    });
});
//------------------deberian estar separados
app.post('/editUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.editUser)(req));
}));
app.post('/editProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.editProduct)(req));
}));
//------------------deberian estar separados
app.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.createUser)(req));
}));
app.post('/createProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.createProduct)(req));
}));
app.post('/createCompra', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.createCompra)(req));
}));
function logger(req, res, next) {
    console.log("prueba");
    next();
    return;
}
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
