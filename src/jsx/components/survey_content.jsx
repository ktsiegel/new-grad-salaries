var React = require('react');
var OfferInfo = require('../helpers/offer.jsx');
var Bootstrap = require('react-bootstrap');
var FormInput = require('./form_input.jsx');
var FormDropdown = require('./form_dropdown.jsx');

var SurveyContent = React.createClass({
  getInitialState: function() {
    return {
      university: '',
      ethnicity: '',
      gender: '',
      company: '',
      companyType: '',
      positionType: '',
      baseSalary: '',
      signingBonus: '',
      equityPercent: '',
      equityAmount: '',
      companyLocation: ''
    };
  },
  
  render: function() {
    return (
      <form>
        <FormInput label='University'/>
        <FormDropdown label='Ethnicity' options={OfferInfo.ethnicity} keyName='ethnicity'/>
        <FormDropdown label='Gender' options={OfferInfo.gender} keyName='gender'/>
        <FormInput label='Company'/>
        <FormDropdown label='Company Type' options={OfferInfo.company.map(c => c.name)} keyName='companytype'/>
        <FormInput label='Position'/>
        <FormInput label='Base Salary'/>
        <FormInput label='Signing Bonus'/>
        <FormInput label='Equity Percent'/>
        <FormInput label='Equity Amount'/>
        <FormDropdown label='Company Location' options={OfferInfo.loc} keyName='location'/>
      </form>
    );
  }
});

module.exports = SurveyContent;
