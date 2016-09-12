var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  var pageInfo = {
    title: 'New-Grad Salaries'
  };
  res.render('index', pageInfo);
});

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.session.recentAuth = true;
    res.redirect('/');
  });

router.get('/auth', function(req, res, next) {
  var recentAuth = req.session.recentAuth;
  req.session.recentAuth = null;
  res.json({
    isAuthenticated: req.isAuthenticated(),
    showSurvey: recentAuth
  });
});


module.exports = router;
