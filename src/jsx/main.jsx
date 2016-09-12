var React = require("react");
var ReactDOM = require("react-dom");
var SurveyModal = require("./survey_modal.jsx");
var DataDisplay = require("./data_display.jsx");
var Button = require("react-bootstrap").Button;

var Container = React.createClass({
  getInitialState: function() {
    return {
      showSurvey: false,
      isAuthenticated: false
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get("/auth", function (res) {
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
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">New-Grad Salaries</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Button onClick={this.showSurveyModal} id="take-survey-btn">Submit Data</Button></li>
              </ul>
            </div>
          </div>
        </div>
        {modal}
        <DataDisplay />
      </div>
    );
  }
});

function render(){
  ReactDOM.render(<Container />, document.getElementById("container"));    
}
render();
