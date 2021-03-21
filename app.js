const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes');

const ROUTES = {
  root: '/',
  addProduct: '/add-product',
  addProductFormdata: '/add-product-formdata'
};

app.use(bodyParser.urlencoded({extended: false}));

app.use(ROUTES.root, (req, res, next) => {
  console.log('this always runs');
  next();
  // res.send('<h1></h1>');
});


app.use(ROUTES.addProduct, (req, res, next) => {
  res.send(`
  <html>
    <head>
      <title>My first page</title>
    </head>
    <body>
      <form action="${ROUTES.addProductFormdata}" method="POST">
        <input name="username" />
        <button type="submit">Submit</button>
      </form>
      <a href="/users">List of Users</a>
    </body>
  </html>`);
});



app.post(ROUTES.addProductFormdata, (req, res, next) => {
  // console.log(req);
  console.log(res.body);
  // res.send('<h1>Test</h1>');
  res.redirect(ROUTES.root);
});


app.use(ROUTES.root, (req, res, next) => {
  res.send('<h1>Test</h1>');
});

app.listen(3000);
