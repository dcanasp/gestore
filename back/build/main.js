"use strict";
//npm run tsc
//node build/routes.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npx prisma db pull
const express_1 = __importDefault(require("express"));
const All_1 = __importDefault(require("./routes/All"));
const buyer_1 = __importDefault(require("./routes/buyer"));
const seller_1 = __importDefault(require("./routes/seller"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors({ origin: 'http://localhost:1234' }));
//node types y express types  
app.use("/", All_1.default);
app.use("/BUY/", buyer_1.default);
app.use("/SELL/", seller_1.default);
app.use("/ADMIN/", admin_1.default);
function logger(req, res, next) {
    console.log("prueba");
    next();
    return;
}
app.listen(3000, function () {
    console.log('el back esta corriendo en el puerto 3000, no olviden instanciar ambas terminales con front y back...');
});