const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errors');
const sequelize = require('./utils/database');

/**
 * Models
 */
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


/**
 * Associations
 */
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);

// 1 cart can include man
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});


/**
 * Express APP
 */
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


/**
 * Middlewares
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


/**
 * Routes
 */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


/**
 * Sequelize
 */
sequelize
  // .sync({force: true})
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  // .then((user) => {
  //   if (!user) {
  //     return User.create({
  //       name: 'Max',
  //       email: 'test@test.com'
  //     })
  //   }
  //   return user;
  //
  // })
  // .then((user) => {
  //   return user.createCart();
  // })
  .then(() => {
    app.listen(3000, null, () => {
      console.log(`Host started at port 3000`);
    });
  });


