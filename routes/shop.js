const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

// /products => GET
router.get('/products', shopController.getListProducts);


router.get('/products/:productId', shopController.getProduct);

// /cart => GET
router.get('/cart', shopController.getCart);

// /cart => POST
router.get('/cart', shopController.postCart);

// /checkout => GET
router.get('/checkout', shopController.getCheckout);

module.exports = router;
