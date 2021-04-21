const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errors');
const sequelize = require('./utils/database');


const Product = require('./models/product');
const User = require('./models/user');

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findByPk(1)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then((res) => {
      return User.findByPk(1);
      
  })
  .then((user) => {
      if (!user) {
          return User.create({
              name: 'Max',
              email: 'test@test.com'
          })
      }
      return user;

  })
  .then(() => {
      app.listen(3000, null, () => {
          console.log(`Host started at port 3000`);
      });
  });


