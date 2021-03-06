var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config.json');
var User = require('./models/user.js');

var routes = require('./routes/index');

var app = express();

////////////////////////////////////////////
//AUTHENTICATION
///////////////////////////////////////////
passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK_APP_ID,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: config.HOST + "auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email']
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id, email: profile.email }, function (err, user) {
    return cb(err, user);
  });
}
));
 
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

app.use(require('express-session')({ secret: config['APP_SECRET'], resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


/////////////////////////////////////////////
// APP SETUP
/////////////////////////////////////////////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

////////////////////////////////////////////
// DATABASE
///////////////////////////////////////////
mongoose.connect('mongodb://localhost/ngn');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to DB localhost/ngn");
});


//////////////////////////////////////////
// ERROR HANDLERS
/////////////////////////////////////////
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
