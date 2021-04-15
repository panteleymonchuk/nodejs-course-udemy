const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'udemy-nodejs-maximilian',
  password: 'rootroot'
});

module.exports = pool.promise();
