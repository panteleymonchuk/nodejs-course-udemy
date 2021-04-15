const fs = require('fs');
const path = require('path');

const Cart = require('./cart');
const db = require('../utils/database');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
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
    Product.findById(this.id).then(([rows, reqInfo]) => {
      const [product] = rows;
      // console.log(product);
      if (!product) {
        // console.log('create');
        return this.create();
      } else {
        this.update();
        // console.log('update');
      }
    });
    // getProductsFromFile(products => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       prod => prod.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });
  }
  
  create() {
    const q = `
      INSERT INTO products(title, price, description, imageUrl)
      VALUES (${this.title}, ${this.price}, ${this.description}, ${this.imageUrl})
    `;
    return db.execute(q);

    // const q = `
    //   INSERT INTO products(title, price, description, imageUrl)
    //   VALUES (?, ?, ?, ?)
    // `;
    // db.execute(q, [this.title, this.price, this.description, this.imageUrl]);
  }

  update() {
    console.log(this.imageUrl);
    const q = `
      UPDATE products
      SET 
        title=${this.title},
        price=${this.price},
        description='${this.description}',
        imageUrl='${this.imageUrl}'
      WHERE id=${this.id}`;
    return db.execute(q);
  }
  
  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
  
  static fetchAll() {
    return db.execute('SELECT * from products');
  }
  
  static findById(id, cb) {
    const q = `SELECT * from products WHERE id='2'`;
    return db.execute(q);
    // getProductsFromFile(products => {
      // const product = products.find(p => p.id === id);
      // cb(product);
    // });
  }
};
