var React = require('react');
var OfferInfo = require('../helpers/offer.jsx');
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var ButtonGroup = Bootstrap.ButtonGroup;

var DataDisplay = React.createClass({
  getInitialState: function() {
    return {
      ethnicity: null,
      gender: null,
      companyType: null,
      location: null,
      averages: {
        baseSalaryAverage: 0,
        equityAmountAverage: 0,
        equityPercentAverage: 0,
        signingBonusAverage: 0
      }
    };
  },

  componentDidMount: function() {
    this.fetchAverage(this.state);
  },

  updateParameter: function(key, value) {
    var newState = this.state;
    if (newState[key] == value) {
      newState[key] = null;
    } else {
      newState[key] = value;
    }
    this.setState(newState);
    this.fetchAverage(newState);
  },

  fetchAverage: function(state) {
    var that = this;
    $.get('/averages', {
      ethnicity: state.ethnicity,
      gender: state.gender,
      companyType: state.companyType,
      location: state.location
    }).done(function( data ) {
      if (data.averages != null) {
        that.setState({averages: data.averages});
      } else {
        that.setState({
          averages: {
            baseSalaryAverage: null,
            equityAmountAverage: null,
            equityPercentAverage: null,
            signingBonusAverage: null
          }
        });
      }
    });
  },

  renderButtonGroup: function(options, key) {
    var that = this;
    var optionButtons = [];
    var selected = this.state[key];
    options.forEach(function(option, index) {
      var className = '';
      if (selected == option) {
        className = 'active';
      }
      optionButtons.push(
        <Button
          className={className}
          key={key + '-' + index}
          onClick={that.updateParameter.bind(null, key, option)}>
          {option}
        </Button>);
    });
    return (
      <div>
        <ButtonToolbar>
          <ButtonGroup>
            {optionButtons}
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  },

  render: function() {
    var ethnicityButtons = this.renderButtonGroup(OfferInfo.ethnicity.slice(0,-2), 'ethnicity');
    var genderButtons = this.renderButtonGroup(OfferInfo.gender.slice(0,-1), 'gender');
    var companyButtons = this.renderButtonGroup(OfferInfo.company.map(c => c.abbreviation), 'companyType');
    var locationButtons = this.renderButtonGroup(OfferInfo.loc.slice(0,-1), 'location');
    var noDataDisplay = (
      <div>
        <p><b>Not enough data.</b> To protect anonymity, we do not display averages of data subsets with too few data points.</p>
      </div>
    );

    var baseSalaryDisplay = noDataDisplay;
    if (this.state.averages.baseSalaryAverage) {
      baseSalaryDisplay = (<p>{this.state.averages.baseSalaryAverage}</p>);
    }
    var signingBonusDisplay = noDataDisplay;
    if (this.state.averages.signingBonusAverage) {
      signingBonusDisplay = (<p>{this.state.averages.signingBonusAverage}</p>);
    }
    var equityDisplay = noDataDisplay;
    var equityStr = '';
    if (this.state.averages.equityPercentAverage) {
      equityStr += this.state.averages.equityPercentAverage;
      if (this.state.averages.equityAmountAverage) {
        equityStr += ' or ';
      }
    }
    if (this.state.averages.equityAmountAverage) {
      equityStr += this.state.averages.equityAmountAverage;
    }
    if (equityStr != '') {
      equityDisplay = <p>{equityStr}</p>
    }
        
    return (
      <div id='data-display-wrapper'>
        <div id='average-info'>
          <h2>Average base salary</h2>
          {baseSalaryDisplay}
          <h2>Average signing bonus</h2>
          {signingBonusDisplay}
          <h2>Average equity</h2>
          {equityDisplay}
        </div>
        <div id='filter-button-groups'>
          <h2>Company Type</h2>
          {companyButtons}
          <h2>Location</h2>
          {locationButtons}
          <h2>Gender</h2>
          {genderButtons}
          <h2>Ethnicity</h2>
          {ethnicityButtons}
        </div>
      </div>
    );
  }
});

module.exports = DataDisplay;
