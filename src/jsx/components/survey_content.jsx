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
        <FormInput
          label='University'
          onChange={val => this.setState({university:val})}/>
        <FormDropdown
          label='Ethnicity'
          options={OfferInfo.ethnicity}
          keyName='ethnicity'
          onChange={val => this.setState({ethnicity:val})}/>
        <FormDropdown
          label='Gender'
          options={OfferInfo.gender}
          keyName='gender'
          onChange={val => this.setState({gender:val})}/>
        <FormInput
          label='Company'
          onChange={val => this.setState({company:val})}/>
        <FormDropdown
          label='Company Type'
          options={OfferInfo.company.map(c => c.name)}
          keyName='companytype'
          onChange={val => this.setState({companyType:val})}/>
        <FormInput
          label='Position'
          onChange={val => this.setState({positionType: val})}/>
        <FormInput
          label='Base Salary'
          onChange={val => this.setState({baseSalary: val})}/>
        <FormInput
          label='Signing Bonus'
          onChange={val => this.setState({signingBonus: val})}/>
        <FormInput
          label='Equity Percent'
          onChange={val => this.setState({equityPercent: val})}/>
        <FormInput
          label='Equity Amount'
          onChange={val => this.setState({equityAmount: val})}/>
        <FormDropdown
          label='Company Location'
          options={OfferInfo.loc}
          keyName='location'
          onChange={val => this.setState({companyLocation: val})}/>
      </form>
    );
  }
});

module.exports = SurveyContent;
