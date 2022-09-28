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
exports.getUser = void 0;
//npm install @prisma/client 
//npx prisma generate
//npx prisma db pull
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const addUsers = yield prisma.usuario.create({
            data: {
                username: 'esteban',
                password: '12345',
                rol: 0,
                email: 'elopezb@unal.edu.co'
            }
        });
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
