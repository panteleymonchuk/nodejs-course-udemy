const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

// /products => GET
router.get('/products');

// /cart => GET
router.get('/cart');

// /checkout => GET
router.get('/checkout');

module.exports = router;
