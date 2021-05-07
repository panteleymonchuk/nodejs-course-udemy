const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errors');
const mongoConnect = require('./utils/database').mongoConnect;

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


mongoConnect(() => {
  app.listen(3000, () => {
    console.log(' --- Started --- ');
  });
});

