const express = require('express');

const router = express.Router();
const { ROUTES } = require('./../constants');

router.get(ROUTES.root, (req, res, next) => {
  res.send('<h1>Test</h1>');
});

module.exports = router;
