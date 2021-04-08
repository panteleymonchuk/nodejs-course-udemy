const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsDb = (cb) => {
  fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  
  save() {
    getProductsDb((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(p => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (err) throw err;
        });
      } else {
        this.id = Math.random().toString();
        fs.writeFile(p, JSON.stringify([...products, this]), (err) => {
          if (err) throw err;
        });
      }
    });
  }
  
  static fetchAllProducts(cb) {
    getProductsDb(cb);
  }
  
  static findById(id, cb) {
    getProductsDb(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
