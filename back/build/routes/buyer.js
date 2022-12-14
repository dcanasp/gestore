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
const createDatabase_1 = require("../createDatabase"); //Post
const user_1 = require("../auth/user");
const buy = express_1.default.Router();
buy.post('/createCompra', user_1.auth0, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!rolVerified(req.token)) {
        res.send(console.error());
    }
    else {
        res.send(yield (0, createDatabase_1.createCompra)(req));
    }
}));
function rolVerified(token) {
    if (token.rol != 1) {
        console.log(token.rol);
        return false;
    }
    return true;
}
exports.default = buy;
