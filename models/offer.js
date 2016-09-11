var mongoose = require('mongoose');

var OfferSchema = mongoose.Schema({
  university: String,
  ethnicity: String,
  gender: String,
  companyType: String,
  positionType: String,
  baseSalary: Number,
  signingBonus: Number,
  equityPercent: Number,
  equityAmount: Number,
  projectedBonus: Number,
  companyLocation: String
});

var Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer
