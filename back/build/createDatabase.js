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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruebaPost = exports.editUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const editUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cambios = req.body;
        const addUsers = yield prisma.usuario.update({
            data: {
                username: cambios.username,
                password: cambios.password,
                email: cambios.email,
            },
            where: {
                user_id: 5
            },
        });
        const users = yield prisma.usuario.findFirst({
            where: {
                //@ts-ignore //si toca...
                username: 5,
            }
            //NO SE HACER TYPADO
        });
        console.log(users);
        return "funciono, usuario cambiado";
    }
    catch (err) {
        console.log(err);
    }
});
exports.editUser = editUser;
const pruebaPost = (req, res) => {
    //console.log(req.body);
    return req.body;
};
exports.pruebaPost = pruebaPost;
