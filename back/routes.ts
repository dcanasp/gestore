//npm run tsc
//node build/routes.js

//npx prisma db pull
import express = require('express');

// Create a new express application instance
const app: express.Application = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/a',function(req,res){
    res.send('llamar a base');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});