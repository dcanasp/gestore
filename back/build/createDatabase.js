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
exports.pruebaPost = exports.createCompra = exports.createProduct = exports.createUser = exports.editProduct = exports.editUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const editUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cambios = req.body;
        const addUsers = yield prisma.usuario.update({
            where: {
                user_id: cambios.user_id,
            },
            data: {
                username: cambios.username,
                password: cambios.password,
                email: cambios.email,
            }
        });
        return "funciono, usuario cambiado";
    }
    catch (err) {
        console.log(err);
    }
});
exports.editUser = editUser;
const editProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cambios = req.body;
        const addProduct = yield prisma.producto.update({
            where: {
                product_id: cambios.product_id,
            },
            data: {
                nombre: cambios.nombre,
                descripcion: cambios.descripcion,
                stock: cambios.stock,
                precio: cambios.precio,
            }
        });
        return "funciono, producto cambiado";
    }
    catch (err) {
        console.log(err);
    }
});
exports.editProduct = editProduct;
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let nuevo = req.body;
        const addUsers = yield prisma.usuario.create({
            data: {
                username: nuevo.username,
                password: nuevo.password,
                rol: nuevo.rol,
                email: nuevo.email
            }
        });
        return "usuario creado";
    }
    catch (err) {
        console.log(err);
    }
});
exports.createUser = createUser;
const createProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let nuevo = req.body;
        const addProductos = yield prisma.producto.create({
            data: {
                user_id: nuevo.user_id,
                image_id: nuevo.image_id,
                nombre: nuevo.nombre,
                descripcion: nuevo.descripcion,
                stock: nuevo.stock,
                precio: nuevo.precio,
            }
        });
        return "producto creado";
    }
    catch (err) {
        console.log(err);
    }
});
exports.createProduct = createProduct;
const createCompra = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let nuevo = req.body;
        const getCompra = yield prisma.compra.create({
            data: {
                compra_id: nuevo.compra_id,
                user_id: nuevo.user_id,
                fecha: nuevo.fecha,
                product_id: nuevo.product_id,
            }
        });
        return "producto creado";
    }
    catch (err) {
        console.log(err);
    }
});
exports.createCompra = createCompra;
const pruebaPost = (req, res) => {
    //console.log(req.body);
    return req.body;
};
exports.pruebaPost = pruebaPost;
