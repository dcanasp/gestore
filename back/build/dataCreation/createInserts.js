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
//npm install @prisma/client 
//npx prisma generate
//npx prisma db pull
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getNombre = () => {
    let nombre = ["LEOPOLDO", "VIVIANE", "ENRIQUETA", "MAYME", "FELIX", "SILVESTER", "PILAR", "KALLIE", "ALEASE", "BINDY", "AMANCIO", "LULU", "HARLAND", "JORDON", "RENATA", "WINSLOW", "STACIE", "ROSA", "LISELOTTE", "VICTORIA", "ALBINA", "ABRAHAM", "EMILIANA", "JOSUE", "GEREON", "XIMENA", "RUBINA", "DEMETRIO", "CECILIO", "OTTILIE"];
    return nombre[Math.floor(Math.random() * nombre.length)] + " " + nombre[Math.floor(Math.random() * nombre.length)];
};
const getEmail = (nombre) => {
    let dividido = nombre.split(" ");
    return dividido[0] + Math.floor(Math.random() * 9999) + dividido[1];
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 15; i++) {
            let nombre = getNombre();
            const addUsers = yield prisma.usuario.create({
                data: {
                    username: nombre,
                    password: '1234',
                    rol: Math.floor(Math.random() * 2) + 1,
                    email: getEmail(nombre)
                }
            });
        }
        //const add //no se que añadir
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
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
