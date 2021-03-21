const express = require('express');
const path = require('path');

const router = express.Router();
const { ROUTES } = require('./../constants');



router.get(ROUTES.addProduct, (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

router.post(ROUTES.addProduct, (req, res, next) => {
  // console.log(req);
  console.log(res.body);
  // res.send('<h1>Test</h1>');
  res.redirect(ROUTES.root);
});

module.exports = router;
