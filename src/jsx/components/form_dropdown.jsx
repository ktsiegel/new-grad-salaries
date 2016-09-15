var React = require('react');
var Bootstrap = require('react-bootstrap');
var FormGroup = Bootstrap.FormGroup;
var ControlLabel = Bootstrap.ControlLabel;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var FormDropdown = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    keyName: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      value: ''
    };
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },

  render: function() {
    dropdownOptions = [];
    var props = this.props;
    props.options.forEach(function(e, i) {
      var key = props.keyName + '-' + i;
      dropdownOptions.push(<MenuItem key={key} eventKey={key}>{e}</MenuItem>);
    });
    return (
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        <br/>
        <DropdownButton title='' key={props.keyName} id={props.keyName + '-dropdown'}>
          {dropdownOptions}
        </DropdownButton>
      </FormGroup>
    );
  }
});

module.exports = FormDropdown;
