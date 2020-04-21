const router = require("express").Router();
const passport = require('passport');

router.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/login',
  function(req, res){
    res.render('login');
  });

router.get('/login/google', passport.authenticate('google', {
    scope: ['profile']
  }));

router.get('/return', passport.authenticate('google'), (req, res) => {
    res.redirect("/dashboard")
  });

router.get('/dashboard',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('dashboard', { user: req.user });
  });

  module.exports = router;

