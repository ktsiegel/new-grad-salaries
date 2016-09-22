var React = require('react');
var ReactDOM = require('react-dom');
var SurveyModal = require('./components/survey_modal.jsx');
var DataDisplay = require('./components/data_display.jsx');
var Button = require('react-bootstrap').Button;

var Container = React.createClass({
  getInitialState: function() {
    return {
      showSurvey: false,
      isAuthenticated: false
    };
  },

  componentDidMount: function() {
    $.get('/auth', function (res) {
      this.setState({
        isAuthenticated: res.isAuthenticated,
        showSurvey: res.showSurvey
      });
    }.bind(this));
  },

  showSurveyModal: function() {
    this.setState({showSurvey: true});
  },

  hideSurveyModal: function() {
    this.setState({showSurvey: false});
  },

  render: function() {
    let modal;
    if (this.state.showSurvey) {
      modal = (<SurveyModal hideSurvey={this.hideSurveyModal} isAuthenticated={this.state.isAuthenticated}/>);
    }
    return(
      <div>
        <div className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header pull-left'>
              <a className='navbar-brand' href='#'>New-Grad Salaries</a>
            </div>
            <div className='navbar-header pull-right'>
               <Button onClick={this.showSurveyModal} id='take-survey-btn' className='btn-primary'>Submit Data</Button>
            </div>
          </div>
        </div>
        {modal}
        <div id='blurb-div'>
          <div className='col-sm-6 col-sm-offset-3'>
            <p>You can use this dashboard to explore average compensation for different student demographics. However, you will note that the dataset is far from complete. To submit your information to the dataset, <Button bsStyle='link' onClick={this.showSurveyModal} id='show-modal-link'>click here</Button>.</p>
          </div>
        </div>
        <DataDisplay />
        <div id='footer' className='navbar navbar-default'>
          Contribute to the project on GitHub <a href='https://github.com/kathrynsiegel/new-grad-salaries'>here</a>.
        </div>
      </div>
    );
  }
});

function render(){
  ReactDOM.render(<Container />, document.getElementById('container'));    
}
render();
