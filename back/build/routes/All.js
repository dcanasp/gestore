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
const router = express_1.default.Router();
router.get('/', function (req, res) {
    res.send('esto es un servicio y se consume con un url destinado...');
});
router.get('/checkUser/:username', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(
        //{existe: await getUser(req.query)}
        yield (0, getDatabase_1.getUser)(req));
    });
});
router.get('/checkUser', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("usuario No enviado, url dinamica...");
    });
});
router.get('/getImages/:image_id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getImagen)(req));
    });
});
router.get('/getImages', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getImagen)(req));
    });
});
router.get('/getAllProducts', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getAllProducts)());
    });
});
exports.default = router;
