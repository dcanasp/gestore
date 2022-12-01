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
exports.pruebaPost = exports.createCompra = exports.createProduct = exports.createUser = exports.getOneUser = exports.getOneSeller = exports.editProduct = exports.editUser = exports.deleteUser = void 0;
const client_1 = require("@prisma/client");
const user_1 = require("./auth/user");
const prisma = new client_1.PrismaClient();
const deleteUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = Number(req.query.user_id);
        //Verificacion usuario
        if ((userId != req.token.user_id) && (req.token.rol != 3)) {
            console.log(userId);
            console.log(req.token.user_id);
            throw new Error("NO TIENE PERMISO POR TOKEN");
        }
        const remove = yield prisma.usuario.update({
            where: {
                user_id: Number(req.query.user_id),
            },
            data: {
                estado: 0,
                //TODO
            }
        });
        return "funciono, usuario eliminado ";
    }
    catch (err) {
        console.log(err);
        return "Algo salio mal";
    }
});
exports.deleteUser = deleteUser;
const editUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cambios = req.body;
        //Verificacion usuario
        if (cambios.user_id != req.token.user_id) {
            console.log(cambios.user_id);
            console.log(req.token.user_id);
            throw new Error("NO TIENE PERMISO POR TOKEN");
        }
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
        return "Algo salio mal";
    }
});
exports.editUser = editUser;
const editProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cambios = req.body;
        const seller = yield (0, exports.getOneSeller)(req.body.product_id);
        //Verificacion usuario
        if ((seller != req.token.user_id) && (req.token.rol != 3)) {
            console.log(seller);
            console.log(req.token.user_id);
            throw new Error("NO TIENE PERMISO POR TOKEN");
        }
        const addProduct = yield prisma.producto.update({
            where: {
                product_id: cambios.product_id,
            },
            data: {
                nombre: cambios.nombre,
                image_id: cambios.image_id,
                descripcion: cambios.descripcion,
                stock: cambios.stock,
                precio: cambios.precio,
            }
        });
        return "funciono, producto cambiado";
    }
    catch (err) {
        console.log(err);
        return "Algo salio mal";
    }
});
exports.editProduct = editProduct;
const getOneSeller = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUProducts = yield prisma.producto.findFirst({
            where: {
                product_id: product_id
            }
        });
        return allUProducts === null || allUProducts === void 0 ? void 0 : allUProducts.user_id;
    }
    catch (e) {
        console.error(e);
        yield prisma.$disconnect();
        return "Algo salio mal";
    }
});
exports.getOneSeller = getOneSeller;
const getOneUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.usuario.findFirst({
            where: {
                username: username
            }
        });
        return allUsers === null || allUsers === void 0 ? void 0 : allUsers.user_id;
    }
    catch (e) {
        console.error(e);
        return "Algo salio mal";
    }
});
exports.getOneUser = getOneUser;
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let nuevo = req.body;
        const addUsers = yield prisma.usuario.create({
            data: {
                username: nuevo.username,
                password: nuevo.password,
                rol: nuevo.rol,
                email: nuevo.email,
                estado: 1,
            }
            //TODO
        });
        //@ts-ignore
        let importantes = { user_id: yield (0, exports.getOneUser)(nuevo.username), rol: nuevo.rol };
        return yield (0, user_1.createToken)(importantes);
    }
    catch (err) {
        console.log(err);
        return { error: "Algo salio mal" };
    }
});
exports.createUser = createUser;
const createProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let nuevo = req.body;
        //Verificacion usuario
        if (nuevo.user_id != req.token.user_id) {
            console.log(nuevo.user_id);
            console.log(req.token.user_id);
            throw new Error("NO TIENE PERMISO POR TOKEN");
        }
        const addProductos = yield prisma.producto.create({
            data: {
                user_id: nuevo.user_id,
                image_id: nuevo.image_id,
                nombre: nuevo.nombre,
                descripcion: nuevo.descripcion,
                stock: nuevo.stock,
                precio: nuevo.precio,
                categoria: nuevo.categoria,
            }
        });
        return "producto creado";
    }
    catch (err) {
        console.log(err);
        return "Algo salio mal";
    }
});
exports.createProduct = createProduct;
const createCompra = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let nuevo = req.body;
        //FINAL FINAL FINAL
        if (nuevo.user_id != req.token.user_id) {
            console.log(nuevo.user_id);
            console.log(req.token.user_id);
            throw new Error("NO TIENE PERMISO POR TOKEN");
        }
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
        return "Algo salio mal";
    }
});
exports.createCompra = createCompra;
const pruebaPost = (req, res) => {
    //console.log(req.body);
    return req.body;
};
exports.pruebaPost = pruebaPost;
