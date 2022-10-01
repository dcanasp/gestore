//npm run tsc
//node build/routes.js

//npx prisma db pull
import express = require('express');
import {getUser,getProducts,getCompras,getImagen} from './getDatabase'

// Create a new express application instance
const app: express.Application = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/checkUser',async function(req,res){
  res.send(
    //{existe:getUser(req.query)}
    await getUser(req.query)  
    );
});
app.get('/getProducts',async function(req,res){
  res.send(
    await getProducts()
  );
});
app.get('/getClients',async function(req,res){
  res.send(
    await getCompras()
    );
});
app.get('/oneImage',async function(req,res) {
  res.send(
    await getImagen(req.query)

  )  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});