const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const rootDir = require('./utils/path');

const { ROUTES } = require('./constants');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', 'views');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((rq, rs, nxt) => {
  rs.status(404).render('404.pug');
});


app.listen(3000);
