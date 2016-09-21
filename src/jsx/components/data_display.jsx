var React = require('react');
var OfferInfo = require('../helpers/offer.jsx');
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var ButtonGroup = Bootstrap.ButtonGroup;
var Popover = Bootstrap.Popover;
var OverlayTrigger = Bootstrap.OverlayTrigger;
var StatBox = require('./stat_box.jsx');
var FilterButtons = require('./filter_buttons.jsx');

var DataDisplay = React.createClass({
  getInitialState: function() {
    return {
      ethnicity: null,
      gender: null,
      positionType: null,
      companyType: null,
      location: null,
      university: null,
      averages: {
        baseSalaryAverage: 0,
        equityAmountAverage: 0,
        equityPercentAverage: 0,
        signingBonusAverage: 0
      }
    };
  },

  componentWillMount: function() {
    this.fetchPopularUniversities();
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
      positionType: state.positionType,
      companyType: state.companyType,
      location: state.location,
      university: state.university
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

  fetchPopularUniversities: function() {
    var that = this;
    $.get('/universities', function(data) {
      that.setState({universities: data.universities});
    });
  },

  renderButtonGroup: function(options, key) {
    var that = this;
    var optionButtons = [];
    var selected = this.state[key];
    options.forEach(function(option, index) {
      var name = option;
      var displayName = option;
      if (typeof option == 'object') {
        name = option.name;
        displayName = option.abbreviation;
      }
      var className = '';
      if (selected == name) {
        className = 'active';
      }
      optionButtons.push(
        <Button
          className={className}
          key={key + '-' + index}
          onClick={that.updateParameter.bind(null, key, name)}>
          {displayName}
        </Button>);
    });
    return (
      <div>
        {optionButtons}
      </div>
    );
  },

  render: function() {
    var ethnicityButtons = this.renderButtonGroup(OfferInfo.ethnicity.slice(0,-2), 'ethnicity');
    var genderButtons = this.renderButtonGroup(OfferInfo.gender.slice(0,-1), 'gender');
    var positionButtons = this.renderButtonGroup(OfferInfo.position, 'positionType');
    var companyButtons = this.renderButtonGroup(OfferInfo.company, 'companyType');
    var locationButtons = this.renderButtonGroup(OfferInfo.loc.slice(0,-1), 'location');
    var universityButtons = this.state.universities ? this.renderButtonGroup(this.state.universities, 'university') : null;
    var noDataBody = 'Not enough data. To protect anonymity, we do not display averages of data subsets with too few data points.';

    var baseSalaryBody = noDataBody;
    if (this.state.averages.baseSalaryAverage) {
      baseSalaryBody = '$' + parseFloat(this.state.averages.baseSalaryAverage).toFixed(2);
    }
    var signingBonusBody = noDataBody;
    if (this.state.averages.signingBonusAverage) {
      signingBonusBody = '$' + parseFloat(this.state.averages.signingBonusAverage).toFixed(2);
    }
    var equityBody = noDataBody;
    var equityStr = '';
    if (this.state.averages.equityPercentAverage) {
      equityStr += (parseFloat(this.state.averages.equityPercentAverage).toFixed(3) + '%');
      if (this.state.averages.equityAmountAverage) {
        equityStr += ' or ';
      }
    }
    if (this.state.averages.equityAmountAverage) {
      equityStr += ('$' + parseFloat(this.state.averages.equityAmountAverage).toFixed(2));
    }
    if (equityStr != '') {
      equityBody = equityStr
    }
        
    var universityFilterButtons = null;
    if (universityButtons) {
      var icon = (<i className='fa fa-question-circle-o' id='question-button'  aria-hidden='true'></i>);
      var popoverRight = (<Popover id='popover-positioned-right'>
        As more data is collected, universities with significant representation will appear in this list. Underrepresented universities are not shown for privacy reasons.
      </Popover>);
      var popoverButton = (
        <OverlayTrigger trigger='click' placement='right' overlay={popoverRight}>
          {icon}
        </OverlayTrigger>
      );
      universityFilterButtons = (<FilterButtons title='University' buttons={universityButtons} icon={popoverButton}/>);
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
          <FilterButtons title='Position Type' buttons={positionButtons}/>
          <FilterButtons title='Location' buttons={locationButtons}/>
          <FilterButtons title='Gender' buttons={genderButtons}/>
          <FilterButtons title='Ethnicity' buttons={ethnicityButtons}/>
          {universityFilterButtons}
        </div>
      </div>
    );
  }
});

module.exports = DataDisplay;
