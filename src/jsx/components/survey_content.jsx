var React = require("react");
var OfferInfo = require("../helpers/offer.jsx");
var Bootstrap = require("react-bootstrap");
var FormGroup = Bootstrap.FormGroup;
var ControlLabel = Bootstrap.ControlLabel;
var FormControl = Bootstrap.FormControl;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var SurveyContent = React.createClass({
  getInitialState: function() {
    return {
      university: "",
      ethnicity: "",
      gender: "",
      company: "",
      companyType: "",
      positionType: "",
      baseSalary: "",
      signingBonus: "",
      equityPercent: "",
      equityAmount: "",
      companyLocation: ""
    };
  },
  
  render: function() {
    var ethnicityDropdownOptions = [];
    OfferInfo.ethnicity.forEach(function(e, i) {
      var key = "ethnicity-" + i;
      ethnicityDropdownOptions.push(<MenuItem key={key} eventKey={key}>{e}</MenuItem>);
    });
    var genderOptions = [];
    OfferInfo.gender.forEach(function(e, i) {
      var key = "gender-" + i;
      genderOptions.push(<MenuItem key={key} eventKey={key}>{e}</MenuItem>);
    });
    var companyTypeOptions = [];
    OfferInfo.company.forEach(function(e, i) {
      var key = "company-" + i;
      companyTypeOptions.push(<MenuItem key={key} eventKey={key}>{e.name}</MenuItem>);
    });
    var companyLocationOptions = [];
    OfferInfo.loc.forEach(function(e, i) {
      var key = "loc-" + i;
      companyLocationOptions.push(<MenuItem key={key} eventKey={key}>{e}</MenuItem>);
    });
    // TODO(katie): modularize into separate react components
    return (
      <form>
        <FormGroup>
          <ControlLabel>University</ControlLabel>
          <FormControl
            type="text"
            value={this.state.university}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Ethnicity</ControlLabel>
          <br/>
          <DropdownButton title="" key="ethnicity" id="ethnicity-dropdown">
            {ethnicityDropdownOptions}
          </DropdownButton>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Gender</ControlLabel>
          <br/>
          <DropdownButton title="" key="gender" id="gender-dropdown">
            {genderOptions}
          </DropdownButton>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Company</ControlLabel>
          <FormControl
            type="text"
            value={this.state.company}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Company Type</ControlLabel>
          <br/>
          <DropdownButton title="" key="companyType" id="company-type-dropdown">
            {companyTypeOptions}
          </DropdownButton>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Position</ControlLabel>
          <FormControl
            type="text"
            value={this.state.position}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Base Salary</ControlLabel>
          <FormControl
            type="text"
            value={this.state.baseSalary}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Signing Bonus</ControlLabel>
          <FormControl
            type="text"
            value={this.state.baseSalary}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Equity Percent</ControlLabel>
          <FormControl
            type="text"
            value={this.state.equityPercent}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Equity Amount</ControlLabel>
          <FormControl
            type="text"
            value={this.state.equityAmount}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Company Location</ControlLabel>
          <br/>
          <DropdownButton title="" key="location" id="location-dropdown">
            {companyLocationOptions}
          </DropdownButton>
        </FormGroup>
      </form>
    );
  }
});

module.exports = SurveyContent;
