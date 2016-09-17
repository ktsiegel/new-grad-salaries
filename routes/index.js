var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Offer = require('../models/offer');

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

router.post('/submit', function(req, res, next) {
  if (req.isAuthenticated()) {
    User.findOne({_id: req.user._id})
      .populate('offer')
      .exec(function(err, user) {
        if (err || !user) {
          res.json({
            success: false,
            message: "Account error."
          });
        } else {
          if (user.offer != null) {
            res.json({
              success: false,
              message: "Error: You have already submitted the survey."
            });
          } else {
            var offer = new Offer(req.body);
            offer.save(function(err) {
              if (err) {
                res.json({
                  success: false,
                  message: "Database error."
                });
              } else {
                user.update({$set: {offer: offer}}, function(err, u) {
                  if (err) {
                    res.json({
                      success: false,
                      message: "Database error."
                    });
                  } else {
                    res.json({
                      success: true,
                      message: "Submitted!"
                    });
                  }
                });
              }
            });
          }
        }
      });
  } else {
    res.json({
      success: false,
      message: "Error: Please log in first."
    });
  }
});

module.exports = router;
