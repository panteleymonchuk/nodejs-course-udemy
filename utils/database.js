const mdb = require('mongodb');
const MongoClient = mdb.MongoClient;

const mongoConnect =  (callback) => {
  MongoClient.connect('mongodb+srv://root:rootroot@cluster0.kjmws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then((res) => {
      callback(res);
    })
    .catch(err => console.log(err))
};

module.exports = mongoConnect;
