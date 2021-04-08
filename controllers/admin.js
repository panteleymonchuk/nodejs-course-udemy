const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const isEditingMode = Boolean(req.query.edit);
  // console.log(' --- test --- ', req.query);
  if (!isEditingMode) {
    return res.redirect('/');
  }
  
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect('/');
    }
    
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: true,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const product = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  product.save();
  res.redirect('/admin');
  
  // const isEditingMode = Boolean(req.query.edit);
  // console.log(' --- test --- ', req.query);
  // if (!isEditingMode) {
  //   return res.redirect('/');
  // }
  //
  // const prodId = req.params.productId;
  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Add Product',
  //     path: '/admin/edit-product',
  //     editing: true,
  //     product: product,
  //   });
  // });
};

