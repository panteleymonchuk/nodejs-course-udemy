// core modules
const path = require('path');

// npm modules
const express = require('express');
const bodyParser = require('body-parser');

// Local modules
const errorsController = require('./controllers/errors');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use(errorsController.handle404);

app.listen(3000);
