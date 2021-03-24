const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const rootDir = require('./utils/path');

const { ROUTES } = require('./constants');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const expressHBS = require('express-handlebars');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// name of extension equal to argument. Like: 404.handlebars
app.engine('handlebars', expressHBS());
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((rq, rs, nxt) => {
  rs.status(404).render('404.handlebars');
});


app.listen(3000);
