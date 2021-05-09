const mongodb = require('mongodb');
const {Model, DataTypes} = require('sequelize');
// const sequelize = require('../utils/database');
const getDb = require('../utils/database').getDb;


class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    
  }
  
  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then(r => console.log(r))
      .catch(err => console.log(err));
  }
  
  static fetchAll() {
    const db = getDb();
  
    return db.collection('products').find().toArray().then(products => {
      console.log(products);
      return products;
    }).catch(err => console.log(err))
    
  }
  
  static findById(prodId) {
    const db = getDb();
    
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => product)
      .catch(err => console.log(err))
  }
}

module.exports = Product;
