exports.getLogin = (req, res, next) => {
  const login = req.get('Cookie') && req.get('Cookie').split(';')[1];
  const isLoggedIn = login && login.trim().split('=')[1];

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  console.log('post message');
  res.setHeader('Set-Cookie', 'loggedIn=true');

  res.redirect('/');
}; 