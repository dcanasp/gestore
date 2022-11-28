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
exports.getUserEmail = exports.getOneSeller = exports.deleteProduct = exports.getAllImages = exports.getAllCompras = exports.getAllProducts = exports.getAllUser = exports.getProductSell = exports.getProduct = exports.getImagen = exports.getUserEdit = exports.getUser = exports.getRol = void 0;
const client_1 = require("@prisma/client");
const user_1 = require("./auth/user");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const allUsers = yield prisma.usuario.findMany({
            where: {
                user_id: 1
            },
        });
        console.dir(allUsers, { depth: null });
        //const allUsers = await prisma.usuario.findMany() //select * from prisma.TABLE... 
        //console.log(allUsers)
    });
}
/*
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
*/
const getRol = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req == null || req == undefined || req.params.username == null || req.params.username == undefined) { //esto se pude resumir en users?.
            throw new Error("no tengo paremetros");
        }
        const rol = yield prisma.usuario.findFirst({
            where: {
                username: req.params.username,
            }
        });
        return rol === null || rol === void 0 ? void 0 : rol.rol;
    }
    catch (e) { //no se pudo conectar a base de datos
        console.error(e);
        throw new Error("Algo salio mal");
        //process.exit(1);
    }
    ;
});
exports.getRol = getRol;
const getUser = (req, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req == null || req == undefined || req.params.username == null || req.params.username == undefined) { //esto se pude resumir en users?.
            throw new Error("no tengo paremetros");
        }
        console.log(req.params.username);
        const users = yield prisma.usuario.findFirst({
            where: {
                username: req.params.username,
                estado: 1,
            }
        });
        if (users == null || users == undefined || users.password == null || users.password == undefined) { //esto se pude resumir en users?.
            throw new Error("usuario o parametro no existente");
        }
        if (req.query.password == users.password) {
            let datos = {
                user_id: Number(users.user_id),
                rol: Number(yield (0, exports.getRol)(req)),
                iat: Date.now()
            };
            return (0, user_1.reDoToken)(datos, req, next);
        }
        throw new Error("clave incorrecta");
    }
    catch (e) { //no se pudo conectar a base de datos
        console.error(e);
        return "Algo salio mal";
        //process.exit(1);
    }
    ;
});
exports.getUser = getUser;
const getUserEdit = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user_id == null || user_id == undefined) { //esto se pude resumir en users?.
            throw new Error("no tengo paremetros");
        }
        const users = yield prisma.usuario.findFirst({
            where: {
                user_id: user_id,
                estado: 1,
            }
        });
        if (users == null || users == undefined || users.password == null || users.password == undefined) { //esto se pude resumir en users?.
            throw new Error("usuario o parametro no existente");
        }
        return users;
    }
    catch (e) {
        return "Algo salio mal";
    }
});
exports.getUserEdit = getUserEdit;
const getImagen = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isNaN(Number(req.params.image_id)) == true) {
            throw new Error("id no numerico");
        }
        const oneImage = yield prisma.imagen.findUnique({
            where: {
                image_id: Number(req.params.image_id)
            }
        });
        if (oneImage == undefined || oneImage == null) {
            throw new Error("no hay imagen, se pone la base");
        }
        return oneImage.image;
    }
    catch (e) {
        try {
            let noEncontrado = yield prisma.imagen.findUnique({
                where: {
                    image_id: 0
                }
            });
            if (noEncontrado == null || noEncontrado == undefined) {
                throw new Error("no hay imagen 0, base datos desconectada");
            }
            return noEncontrado.image;
        }
        catch (e) {
            yield prisma.$disconnect();
            console.log(e);
            return "Algo salio mal";
        }
    }
});
exports.getImagen = getImagen;
const getProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isNaN(Number(req.params.product_id)) == true) {
            throw new Error("id no numerico");
        }
        const oneProduct = yield prisma.producto.findUnique({
            where: {
                product_id: Number(req.params.product_id)
            }
        });
        return oneProduct;
    }
    catch (e) {
        console.log(e);
        return "Algo salio mal";
    }
});
exports.getProduct = getProduct;
const getProductSell = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verificacion usuario
        if (Number(req.params.user_id) != req.token.user_id) {
            console.log(Number(req.params.user_id));
            console.log(req.token.user_id);
            return "NO TIENE PERMISO POR TOKEN";
        }
        if (isNaN(Number(req.params.user_id)) == true) {
            throw new Error("id no numerico");
        }
        const productsSell = yield prisma.producto.findMany({
            where: {
                user_id: Number(req.params.user_id)
            }
        });
        return productsSell;
    }
    catch (e) {
        console.log(e);
        return "Algo salio mal";
    }
});
exports.getProductSell = getProductSell;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.usuario.findMany({
            orderBy: { user_id: 'asc' }
        });
        return allUsers;
    }
    catch (e) {
        return [];
    }
});
exports.getAllUser = getAllUser;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma.producto.findMany({});
        return allProducts;
    }
    catch (e) {
        return [];
    }
});
exports.getAllProducts = getAllProducts;
const getAllCompras = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCompras = yield prisma.compra.findMany({ //select * from prisma.TABLE
        });
        return allCompras;
    }
    catch (e) {
        return [];
    }
});
exports.getAllCompras = getAllCompras;
const getAllImages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allimages = yield prisma.imagen.findMany({});
        return allimages;
    }
    catch (e) {
        return [];
    }
});
exports.getAllImages = getAllImages;
const deleteProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seller = yield (0, exports.getOneSeller)(req.body.product_id);
        //Verificacion usuario
        if ((seller != req.token.user_id) && (req.token.rol != 3)) {
            console.log(seller);
            console.log(req.token.user_id);
            return "NO TIENE PERMISO POR TOKEN";
        }
        const deleteUser = yield prisma.producto.delete({
            where: {
                product_id: Number(req.query.product_id),
            },
        });
        return "producto eliminado";
    }
    catch (err) {
        console.log(err);
        return "Algo salio mal";
    }
});
exports.deleteProduct = deleteProduct;
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
        return "Algo salio mal";
    }
});
exports.getOneSeller = getOneSeller;
const getUserEmail = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.usuario.findFirst({
            where: {
                email: String(req.query.email),
            }
        });
        return user;
    }
    catch (e) {
        console.error(e);
        return "Algo salio mal";
    }
});
exports.getUserEmail = getUserEmail;
