const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


class CartItem extends Model {
}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER
}, { sequelize, modelName: 'cartItem' });


module.exports = CartItem;
