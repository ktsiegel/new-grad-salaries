var React = require('react');
var OfferInfo = require('../helpers/offer.jsx');
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var ButtonGroup = Bootstrap.ButtonGroup;
var StatBox = require('./stat_box.jsx');
var FilterButtons = require('./filter_buttons.jsx');

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
        <ButtonGroup>
          {optionButtons}
        </ButtonGroup>
      </div>
    );
  },

  render: function() {
    var ethnicityButtons = this.renderButtonGroup(OfferInfo.ethnicity.slice(0,-2), 'ethnicity');
    var genderButtons = this.renderButtonGroup(OfferInfo.gender.slice(0,-1), 'gender');
    var companyButtons = this.renderButtonGroup(OfferInfo.company.map(c => c.abbreviation), 'companyType');
    var locationButtons = this.renderButtonGroup(OfferInfo.loc.slice(0,-1), 'location');
    var noDataBody = 'Not enough data. To protect anonymity, we do not display averages of data subsets with too few data points.';

    var baseSalaryBody = noDataBody;
    if (this.state.averages.baseSalaryAverage) {
      baseSalaryBody = '$' + this.state.averages.baseSalaryAverage;
    }
    var signingBonusBody = noDataBody;
    if (this.state.averages.signingBonusAverage) {
      signingBonusBody = '$' + this.state.averages.signingBonusAverage;
    }
    var equityBody = noDataBody;
    var equityStr = '';
    if (this.state.averages.equityPercentAverage) {
      equityStr += (this.state.averages.equityPercentAverage + '%');
      if (this.state.averages.equityAmountAverage) {
        equityStr += ' or ';
      }
    }
    if (this.state.averages.equityAmountAverage) {
      equityStr += ('$' + this.state.averages.equityAmountAverage);
    }
    if (equityStr != '') {
      equityBody = equityStr
    }
        
    return (
      <div id='data-display-wrapper'>
        <div id='stat-boxes' className='row'>
          <StatBox title='Average base salary' body={baseSalaryBody} offset={true}/>
          <StatBox title='Average signing bonus' body={signingBonusBody}/>
          <StatBox title='Average equity' body={equityBody}/>
        </div>
        <div id='filter-button-groups'>
          <FilterButtons title='Company Type' buttons={companyButtons}/>
          <FilterButtons title='Location' buttons={locationButtons}/>
          <FilterButtons title='Gender' buttons={genderButtons}/>
          <FilterButtons title='Ethnicity' buttons={ethnicityButtons}/>
        </div>
      </div>
    );
  }
});

module.exports = DataDisplay;
