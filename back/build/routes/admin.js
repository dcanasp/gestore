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
const user_1 = require("../auth/user");
const admin = express_1.default.Router();
admin.get('/getAllUsers', user_1.middle, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("segundo");
        res.send(
        //await getAllUser() 
        "si");
    });
});
admin.get('/getAllClients', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield (0, getDatabase_1.getAllCompras)());
    });
});
exports.default = admin;