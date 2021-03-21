const http = require('http');
const express = require('express');

const app = express();
const routes = require('./routes');

app.use((req, res, next) => {
  console.log(req);
  
  res.send('<h1>Test</h1>');
});

app.listen(3000);
