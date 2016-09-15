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
    keyName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      value: ''
    };
  },

  handleChange(eventKey) {
    this.setState({value: eventKey});
    this.props.onChange(eventKey);
  },

  render: function() {
    dropdownOptions = [];
    var props = this.props;
    props.options.forEach(function(e, i) {
      var key = props.keyName + '-' + i;
      dropdownOptions.push(<MenuItem key={key} eventKey={e}>{e}</MenuItem>);
    });
    return (
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        <br/>
        <DropdownButton title={this.state.value} key={props.keyName} id={props.keyName + '-dropdown'} onSelect={this.handleChange}>
          {dropdownOptions}
        </DropdownButton>
      </FormGroup>
    );
  }
});

module.exports = FormDropdown;
