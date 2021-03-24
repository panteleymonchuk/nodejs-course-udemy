const express = require('express');
const path = require('path');

const router = express.Router();
const { ROUTES } = require('./../constants');

const { products } = require('../db');

router.get(ROUTES.addProduct, (req, res, next) => {
  res.render('add-product.handlebars');
});

router.post(ROUTES.addProduct, (req, res, next) => {
  console.log(req.body.username);
  products.push(req.body.username);
  res.redirect(ROUTES.root);
});

module.exports = router;
