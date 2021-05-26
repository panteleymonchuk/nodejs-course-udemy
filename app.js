const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errors');
const mongoConnect = require('./utils/database').mongoConnect;

const User = require('./models/user');

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


/**
 * Routes
 */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use((req, res, next) => {
  User
    .findById('60979e8262a6c7918fd9f511')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(() => { console.log('error') });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log(' --- Started --- ');
    
    // const user = new User('vasya', 'test@tst.com');
    // user.save();
    // User.fetchAll();
    
  });
});

