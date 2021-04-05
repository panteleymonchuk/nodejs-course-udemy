const Product = require('../models/products');

exports.getListProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    })
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    })
  });
};
