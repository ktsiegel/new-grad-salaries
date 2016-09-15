var React = require('react');
var Bootstrap = require('react-bootstrap');
var FormGroup = Bootstrap.FormGroup;
var ControlLabel = Bootstrap.ControlLabel;
var FormControl = Bootstrap.FormControl;


var FormInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired
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
    return (
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          type='text'
          value={this.state.value}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
  }
});

module.exports = FormInput;
