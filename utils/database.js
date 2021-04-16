const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'udemy-nodejs-maximilian',
  dialect: 'mysql',
  username: 'root',
  password: 'rootroot',
  host: 'localhost',
  port: 3306,
});

// const sequelize = 

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   database: 'udemy-nodejs-maximilian',
//   password: 'rootroot'
// });

module.exports = sequelize;
