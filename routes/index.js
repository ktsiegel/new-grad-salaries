var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
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
    res.redirect('/');
  });

router.get('/auth', function(req, res, next) {
  if (req.isAuthenticated) {
    res.json({authenticated: true});
  } else {
    res.json({authenticated: false});
  }
});


module.exports = router;
