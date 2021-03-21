const express = require('express');

const router = express.Router();
const { ROUTES } = require('./../constants');



router.get(ROUTES.addProduct, (req, res, next) => {
  res.send(`
  <html>
    <head>
      <title>My first page</title>
    </head>
    <body>
      <form action="${ROUTES.addProductFormdata}" method="POST">
        <input name="username" />
        <button type="submit">Submit</button>
      </form>
      <a href="/users">List of Users</a>
    </body>
  </html>`);
});

router.post(ROUTES.addProductFormdata, (req, res, next) => {
  // console.log(req);
  console.log(res.body);
  // res.send('<h1>Test</h1>');
  res.redirect(ROUTES.root);
});

module.exports = router;
