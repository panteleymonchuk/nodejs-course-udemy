const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  // constructor() {
  //   this.products = [];
  //   this.totalPrice = 0;
  // }
  
  static addProduct(id, productPrice) {
    // fetch the previous cart;
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      
      const existingProductIndex = cart.products.findIndex(pr => pr.id === id );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {
          ...existingProduct,
          qty: existingProduct.qty + 1
        };
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
      }
      
      cart.totalPrice = cart.totalPrice + +productPrice;
      cart.products = [...cart.products, updatedProduct];
      
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
    
  }
}
