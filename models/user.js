var mongoose = require('mongoose');
var Offer = require('./offer');

var UserSchema = mongoose.Schema({
  facebookId: String,
  email: String,
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer'
  }
});

UserSchema.statics.findOrCreate = function(userInfo, cb) {
  var that = this;
  var query = that.where(userInfo);
  query.findOne(function (err, user) {
    if (err) {
      cb(err, null);
    }
    else if (user) {
      cb(null, user);
    } else {
      // not found in db
      that.create(userInfo, function (err, newUser) {
        if (err) {
          cb(err, null);
        } else {
          cb(err, newUser);
        }
      });
    }
  });
}

var User = mongoose.model('User', UserSchema);

module.exports = User;
