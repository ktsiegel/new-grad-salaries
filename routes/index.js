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

router.get('/averages', function(req, res, next) {
  params = {};
  if (req.body.ethnicity) {
    params['ethnicity'] = req.body.ethnicity;
  }
  if (req.body.gender) {
    params['gender'] = req.body.gender;
  }
  if (req.body.companyType) {
    params['companyType'] = req.body.companyType;
  }
  if (req.body.location) {
    params['companyLocation'] = req.body.location;
  }
  Offer.find(params, function(err, docs) {
    if (err) {
      res.send({
        status: 'error',
        message: 'Server error.'
      });
    } else if (docs.length < 10) {
      res.send({
        status: 'success',
        message: 'Not enough data.'
      });
    } else {
      var baseSalarySum = 0;
      var equityAmountSum = 0;
      var equityAmountCount = 0;
      var equityPercentSum = 0;
      var equityPercentCount = 0;
      var signingBonusSum = 0;
      docs.forEach(function(offer) {
        baseSalarySum += offer.baseSalary;
        if (offer.equityAmount > 0) {
          equityAmountSum += offer.equityAmount;
          equityAmountCount += 1
        }
        if (offer.equityPercent > 0) {
          equityPercentSum += offer.equityPercent;
          equityPercentCount += 1
        }
        signingBonusSum += offer.signingBonus;
      });
      res.send({
        status: 'success',
        averages: {
          baseSalaryAverage: (baseSalarySum/docs.length),
          equityAmountAverage: equityAmountCount >= 10 ? (equityAmountSum/equityAmountCount) : null,
          equityPercentAverage: equityPercentCount >= 10 ? (equityPercentSum/equityPercentCount) : null,
          signingBonusAverage: (signingBonusSum/docs.length)
        }
      });
    }
  });
});

module.exports = router;
