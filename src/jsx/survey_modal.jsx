var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Button = require("react-bootstrap").Button;

var SurveyModal = React.createClass({
  propTypes: {
    hideSurvey: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired
  },

  render: function() {
    let submitButton;
    if (this.props.isAuthenticated) {
      submitButton = (<Button bsStyle="primary">Save changes</Button>);
    }
    const modalInstance = (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Take the survey!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="p-modal">
              Contribute to this project by adding your own new-grad salary data.
            </p>
            <div className="center-align">
              <a href="/auth/facebook">
                <Button id="login-with-fb-btn">
                  <i className="fa fa-facebook-official" aria-hidden="true"></i>
                  Continue with Facebook
                </Button>
              </a>
            </div>
            <p className="p-modal">
              Note: Facebook authentication is used to prevent duplicate responses. Your identification information will never be shown in association with your survey response.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.hideSurvey}>Close</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
    return modalInstance;
  }
});

module.exports = SurveyModal;
