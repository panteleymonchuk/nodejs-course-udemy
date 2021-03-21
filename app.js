const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const routes = require('./routes');

const { ROUTES } = require('./constants');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shopRoutes);

app.use(ROUTES.root, (req, res, next) => {
  console.log('this always runs');
  next();
  // res.send('<h1></h1>');
});








app.listen(3000);
