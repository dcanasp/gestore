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
exports.getAllImages = exports.getAllCompras = exports.getAllProducts = exports.getAllUser = exports.getImagen = exports.getUser = void 0;
const client_1 = require("@prisma/client");
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
const getUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req == null || req == undefined || req.params.username == null || req.params.username == undefined) { //esto se pude resumir en users?.
            throw new Error("no tengo paremetros");
        }
        const users = yield prisma.usuario.findFirst({
            where: {
                //@ts-ignore //si toca...
                username: req.params.username,
            }
        });
        if (users == null || users == undefined || users.password == null || users.password == undefined) { //esto se pude resumir en users?.
            throw new Error("usuario o parametro no existente");
        }
        if (req.query.password == users.password) {
            console.log("si");
            return true;
        }
        throw new Error("clave incorrecta");
    }
    catch (e) { //no se pudo conectar a base de datos
        console.error(e);
        yield prisma.$disconnect();
        return false;
        //process.exit(1);
    }
    ;
});
exports.getUser = getUser;
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
            return;
        }
    }
});
exports.getImagen = getImagen;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.usuario.findMany({});
        return allUsers;
    }
    catch (e) {
        yield prisma.$disconnect();
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
        yield prisma.$disconnect();
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
        yield prisma.$disconnect();
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
        yield prisma.$disconnect();
        return [];
    }
});
exports.getAllImages = getAllImages;
