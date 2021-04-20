const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


class User extends Model {
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
}, { sequelize, modelName: 'user' });


module.exports = User;
