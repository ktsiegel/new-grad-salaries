var React = require("react");
var ReactDOM = require("react-dom");
var SurveyModal = require("./survey_modal.jsx");
var DataDisplay = require("./data_display.jsx");

var Container = React.createClass({
  getInitialState: function() {
    return {
      showSurvey: false
    };
  },

  render: function() {
    let modal;
    if (this.state.showSurvey) {
      modal = (<SurveyModal />);
    }
    return(
      <div>
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">New-Grad Salaries</a>
              <button className="btn" id="take-survey-btn">Submit Data</button>
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
