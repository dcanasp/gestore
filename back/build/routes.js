"use strict";
//npm run tsc
//node build/routes.js
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// Create a new express application instance
const app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/a', function (req, res) {
    res.send('llamar a base');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
