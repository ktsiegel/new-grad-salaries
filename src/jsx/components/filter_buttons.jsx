var React = require('react');

var FilterButtons = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    buttons: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className='filter-buttons-container'>
        <h3 className='filter-title'>{this.props.title}</h3>
        <div className='filter-buttons text-center'>{this.props.buttons}</div>
      </div>
    );
  }
});

module.exports = FilterButtons;
