//needed modules
const express = require('express');
const fs = require('fs');
// const slugify = require('slugify');
const path = require(`path`);
// const url = require('url');
const { productstlye } = require(`./productsdata/data.js`);
const app = express();
const port = 3000;
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }))
const bodyParser = require("body-parser");
const router = express.Router();


let productsList = productstlye.productstlye;
class newProduct{
  constructor(id, name, description, image, price){
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
  }
}

//home page
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
});
//list all product
app.get('/productsdata', (req, res) => {
  res.json(productstlye)
})
//post product
app.post('/newdata', (req, res) => {
    const incomingdata = req.body;  
    productstlye.push(incomingdata);  
    res.json(productstlye);
  })

//update product
app.put('/productsdata/:id', (req,res)=>{
  const itemId = Number(req.params.id);
  let findProduct = productsList.find(p => p.id === itemId);
  let index = productsList.indexOf(findProduct)
  updateProduct ={
    id: itemId,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: +req.body.price
  }
  productsList[index] = updateProduct;
  res.json(productsList);
});


//DELETE PRODUCT
app.delete('/product/:id',(request,response)=>{
  const itemId = Number(request.params.id);
  const findProduct = productsList.findIndex(p => p.id === itemId);
  let index = +findProduct;
  productsList.splice(index, 1);
  console.log(index);
  console.log(productsList);
  response.json(productsList)
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})