var React = require('react');
var Bootstrap = require('react-bootstrap');
var FormGroup = Bootstrap.FormGroup;
var ControlLabel = Bootstrap.ControlLabel;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var HelpBlock = Bootstrap.HelpBlock;

var FormDropdown = React.createClass({
  propTypes: {
    keyName: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    options: React.PropTypes.array.isRequired,
    validationState: React.PropTypes.object
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
    var valid = null
    var validationMessage = null;
    if (this.props.validationState) {
      valid = this.props.validationState.status;
      validationMessage = (<HelpBlock>{this.props.validationState.message}</HelpBlock>);
    }
    return (
      <FormGroup validationState={valid}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <br/>
        <DropdownButton
          title={this.state.value}
          key={props.keyName}
          id={props.keyName + '-dropdown'}
          className={'dropdown-' + valid}
          onSelect={this.handleChange}
          noCaret >
          {dropdownOptions}
        </DropdownButton>
        {validationMessage}
      </FormGroup>
    );
  }
});

module.exports = FormDropdown;
