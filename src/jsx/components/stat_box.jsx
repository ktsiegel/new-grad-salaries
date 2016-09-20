var React = require('react');

var StatBox = React.createClass({
  propTypes: {
    body: React.PropTypes.string.isRequired,
    offset: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired
  },

  render: function() {
    className = 'stat-box-container col-lg-2 col-sm-4';
    if (this.props.offset) {
      className += ' col-lg-offset-3';
    }
    return (
      <div className={className}>
        <div className='stat-box'>
          <div className='stat-box-content'>
            <h3 className='stat-box-title'>{this.props.title}</h3>
            <p className='stat-box-body'>{this.props.body}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = StatBox;
