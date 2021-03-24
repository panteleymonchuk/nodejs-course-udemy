const express = require('express');

const router = express.Router();
const { ROUTES } = require('./../constants');
const { products } = require('../db');

router.get(ROUTES.root, (req, res, next) => {
  res.render('shop.handlebars', { prods: products });
});

module.exports = router;
