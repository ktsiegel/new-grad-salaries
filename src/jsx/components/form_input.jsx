var React = require('react');
var Bootstrap = require('react-bootstrap');
var FormGroup = Bootstrap.FormGroup;
var ControlLabel = Bootstrap.ControlLabel;
var FormControl = Bootstrap.FormControl;
var InputGroup = Bootstrap.InputGroup;
var HelpBlock = Bootstrap.HelpBlock;

var FormInput = React.createClass({
  propTypes: {
    after: React.PropTypes.string,
    before: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    validationState: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      placeholder: ''
    };
  },

  getInitialState: function() {
    return {
      value: ''
    };
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.value);
  },

  render: function() {
    var beforeAddOn = null;
    if (this.props.before) {
      beforeAddOn = (<InputGroup.Addon>{this.props.before}</InputGroup.Addon>);
    }
    var afterAddOn = null;
    if (this.props.after) {
      afterAddOn = (<InputGroup.Addon>{this.props.after}</InputGroup.Addon>);
    }
    var validationMessage = null;
    if (this.props.validationState) {
      validationMessage = (<HelpBlock>{this.props.validationState.message}</HelpBlock>);
    }
    return (
      <FormGroup validationState={this.props.validationState ? this.props.validationState.status : null}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <InputGroup>
          {beforeAddOn}
          <FormControl
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
          />
          {afterAddOn}
        </InputGroup>
        {validationMessage}
      </FormGroup>
    );
  }
});

module.exports = FormInput;
