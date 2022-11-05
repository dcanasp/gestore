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
const sell = express_1.default.Router();
sell.post('/editProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.editProduct)(req));
}));
sell.post('/createProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, createDatabase_1.createProduct)(req));
}));
sell.get('/deleteProduct', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.deleteProduct)(req));
    });
});
exports.default = sell;
