const mongodb = require('mongodb');
const sequelize = require('../utils/database');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
      .then(user => user)
      .catch(err => console.log(err));
  }
  
  static fetchAll() {
    const db = getDb();
  
    return db
      .collection('users')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => console.log(err))
  }
  
  static findById(userId) {
  
    const db = getDb();
    return db
      .collection('users')
      .findOne({_id: new ObjectId(userId)});
  }
  
}



module.exports = User;
