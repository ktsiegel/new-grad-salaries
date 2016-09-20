const ethnicity_options = [
  'Caucasian',
  'Black',
  'Hispanic/Latino',
  'American Indian or Alaska Native',
  'Asian/Pacific Islander',
  'Other',
  'Prefer not to answer'
];

const gender_options = [
  'Female',
  'Male',
  'Nonbinary',
  'Prefer not to answer'
];

const position_options = [
  {
    name: 'Technical position (engineering or quantitative role)',
    abbreviation: 'Technical (engineering/quantitative)'
  },
  {
    name: 'Semi-technical position (e.g. PM, product design)',
    abbreviation: 'Semi-technical (PM, product design, etc.)'
  },
  {
    name: 'Non-technical position (e.g. sales, marketing, operations)',
    abbreviation: 'Non-technical'
  }
];

const company_options = [
  {
    name: 'Publicly traded, large tech company (e.g. Google, Facebook, Oracle)',
    abbreviation: 'Public tech company'
  },
  {
    name: 'Pre-seed tech startup',
    abbreviation: 'Pre-seed startup'
  },
  {
    name: 'Post-seed round tech startup',
    abbreviation: 'Post-seed startup'
  },  
  {
    name: 'Post Series A tech startup',
    abbreviation: 'Post-series A startup'
  },
  {
    name: 'Post Series B tech startup (e.g. Opendoor, Mixpanel, Affirm)',
    abbreviation: 'Post-series B startup'
  },
  {
    name: 'Post Series C tech startup (e.g. Dropbox, Airbnb, Uber)',
    abbreviation: 'Post-series C startup'
  }
];

const loc_options = [
  'San Francisco/Bay Area',
  'New York City',
  'Seattle',
  'Boston',
  'Washington D.C.',
  'Austin',
  'Los Angeles',
  'Other'
];

const Options = {
  ethnicity: ethnicity_options,
  gender: gender_options,
  position: position_options,
  company: company_options,
  loc: loc_options
}

module.exports = Options;
