const path = require('path');

const express = require('express');
const rootDir = require('../utils/path');


const adminController = require('../controllers/admin');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products');

// /admin/add-product => POST
router.post('/add-product', adminController.postProduct);

exports.routes = router;
exports.products = products;
