var mongoose = require('mongoose');

var OfferSchema = mongoose.Schema({
  university: String,
  ethnicity: String,
  gender: String,
  company: String,
  companyType: String,
  position: String,
  positionType: String,
  baseSalary: Number,
  signingBonus: Number,
  equityPercent: Number,
  equityAmount: Number,
  location: String
});

var Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer
