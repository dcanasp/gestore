"use strict";
//npm run tsc
//node build/routes.js
Object.defineProperty(exports, "__esModule", { value: true });
//npx prisma db pull
const express = require("express");
const getDatabase_1 = require("./getDatabase");
// Create a new express application instance
const app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/a', function (req, res) {
    res.send((0, getDatabase_1.getUser)(req.query));
});
app.get('/b', function (req, res) {
    res.send('llamar a base');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
