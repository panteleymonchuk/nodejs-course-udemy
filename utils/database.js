const MongoClient = require('mongodb').MongoClient;

let _db;

// console.log(' --- MongoClient --- ', MongoClient);

const mongoConnect =  (callback) => {
  const mongoClient = MongoClient('mongodb+srv://root:rootroot@cluster0.kjmws.mongodb.net/shop', { useUnifiedTopology: true })
  .connect()
    .then((client) => {
      console.log('connected');
      _db = client.db();
      callback();

    })
    .catch(err => console.log(err))
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

