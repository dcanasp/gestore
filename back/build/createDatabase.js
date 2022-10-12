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
        let nombre = req.query.nombre;
        let clave = req.query.clave;
        let correo = req.query.correo;
        let cambios = {};
        //let cambios: usuarios = {};
        //URGENTE: ARREGLAR
        //@ts-ignore
        if (nombre != undefined) {
            cambios.username = nombre;
        }
        //@ts-ignore
        if (clave != undefined) {
            cambios.password = clave;
        }
        //@ts-ignore
        if (correo != undefined) {
            cambios.email = correo;
        }
        if (req.query == undefined || req.query.username == undefined) {
            throw new Error(" aprenda a hacer un post");
        }
        // const addUsers = await prisma.usuario.update({ //insert into ... (SI LO CORREN OTRA VEZ SE VA A CREAR, aqui pondria las funciones de creacion de datos y nice)
        // data:{
        //     //quien putas la declara???
        //     username: nombre,
        //     password: clave,
        //     email: correo,
        //     }
        // })
    }
    catch (err) {
        console.log(err);
    }
});
exports.editUser = editUser;
const pruebaPost = (req, res) => {
    return req.body.data;
};
exports.pruebaPost = pruebaPost;
//https://postman-echo.com/post
