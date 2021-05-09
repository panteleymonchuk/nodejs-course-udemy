const mongodb = require('mongodb');
const {Model, DataTypes} = require('sequelize');
// const sequelize = require('../utils/database');
const getDb = require('../utils/database').getDb;


class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id && new mongodb.ObjectId(id);
    
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update product
      dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
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
  
  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(product => product)
      .catch(err => console.log(err))
  }
}

module.exports = Product;
