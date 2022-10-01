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
exports.getImagen = exports.getCompras = exports.getProducts = exports.getUser = void 0;
//npm install @prisma/client 
//npx prisma db pull
//npx prisma generate //el que hace que se actualicen las dependencias , despues de un pull
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
        const allUsers = yield prisma.usuario.findMany({
            where: {
                username: req.username
            },
        });
        try {
            if (req.password == allUsers[0].password) {
                console.log("si");
                return true;
            }
            console.log("clave incorecta");
            return false;
        }
        catch (e) {
            console.log("usuario not found");
            return false;
        }
    }
    catch (e) { //no se pudo conectar a base de datos
        console.error(e);
        yield prisma.$disconnect();
        //process.exit(1);
    }
    ;
});
exports.getUser = getUser;
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma.producto.findMany({ //select * from prisma.TABLE where user_id=1
        });
        return allProducts;
    }
    catch (e) {
        yield prisma.$disconnect();
        return [];
    }
});
exports.getProducts = getProducts;
const getCompras = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCompras = yield prisma.compra.findMany({ //select * from prisma.TABLE where user_id=1
        });
        return allCompras;
    }
    catch (e) {
        yield prisma.$disconnect();
        return [];
    }
});
exports.getCompras = getCompras;
const getImagen = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.image);
    try {
        const oneImage = yield prisma.imagen.findUnique({
            where: {
                image_id: req.image
            }
        });
        console.log(oneImage);
        if (oneImage == undefined) {
            return (yield prisma.imagen.findMany({
                where: {
                    image_id: 0
                }
            }))[0].image; //si no esta imagen no encontrada 
        }
        return oneImage.image;
    }
    catch (e) {
        yield prisma.$disconnect();
        console.log(e);
        return [];
    }
});
exports.getImagen = getImagen;
