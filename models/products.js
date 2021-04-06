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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  
  save() {
    getProductsDb((res) => {
      fs.writeFile(p, JSON.stringify([...res, this]), (err) => {
        if (err) throw err;
      });
    });
  }
  
  static fetchAllProducts(cb) {
    getProductsDb(cb);
  }
};
